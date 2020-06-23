import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../../api';
import { useServerData } from '../../../../state/serverDataContext';
import News from '../../components/news';
import UpVoteChart from '../../components/upVoteChart';

import './Main.scss';

const blockName = "mainPage";

const Main = ({ location }) => {
     /**
     * Updates data fetched with the cached content 
     **/
    const updateWithCachedData = (dataToUpdate) => {
        if (!dataToUpdate) return null;
        const transformed = dataToUpdate.map((item) => {
             const cachedPoints = api.news.getVotes(item.objectID);
             if (cachedPoints) {
                item.points = cachedPoints;
             }
             return item;
         });
         return transformed;
     };
    const page = Number(new URLSearchParams(location.search).get('page')) || 1;
    const key = `news-page-${page}`;
    const serverNews = useServerData(data => {
        return updateWithCachedData(data[key]);
    });

    const serverRenderedPage = useServerData(data => {
        return (data.query && Number(data.query.page));
    });

    const [data, setData] = useState(serverNews || []);
    
    useEffect(() => {
            if (serverRenderedPage !== page) {
                Main.fetchData({page}).then((response) => {
                    setData(updateWithCachedData(response[key]));
                });
            } else if (data !== serverNews){
                setData(serverNews);
            }
    }, [key, page, serverRenderedPage, serverNews, data]);

   const onUpVote = (newsData) => {
        api.news.updateVote(newsData.objectID, Number(newsData.points) + 1);
        setData(updateWithCachedData([...data]));
   }

    return (
        <div className={blockName}>
            <table className={`${blockName}__newsTable`}>
                <thead className={`${blockName}__header`}>
                    <tr>
                        <th>
                            Comments
                        </th>
                        <th>
                            Vote Count
                        </th>
                        <th>
                            UpVote
                        </th>
                        <th>
                            <div className={`${blockName}__detailsHeader`}>
                            News Details

                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((newsData, index) => <News key={newsData.objectID} newsData={newsData} index={index} onUpVote={onUpVote} />)
                }
                </tbody>
            </table>
            <div className={`${blockName}__footerActions`}>
                {
                    (
                        page > 1 && (
                            <>
                                <Link to={`/news?page=${Number(page) - 1}`}>Previous</Link> | 
                            </>
                        )
                    )
                    
                }
                <Link to={`/news?page=${Number(page) + 1}`}>Next</Link>
            </div>
            <div className={`${blockName}__chartWrapper`}>
                <UpVoteChart data={data} />
            </div>
        </div>
    )
}


Main.fetchData = (query) => {
    let page;
    if (query && query.page) {
        page = Number(query.page);
    } else {
        page = 1;
    }
    return api.news.getPage(page).then(news => {
      return {
        [`news-page-${page}`]: news.hits
      };
    });
  };

export default Main;