import classNames from 'classnames';
import React, { useState, useMemo } from 'react';
import Moment from 'react-moment';

import './News.scss';


const blockName = 'newsComponent';

const News = ({ newsData, index, onUpVote, onHide }) => {
    const [points, setPoints] = useState(Number(newsData.points));
    const [isHidden, setIsHidden] = useState(newsData.isHidden);

    const host = useMemo(() => {
        const parsedUrl = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\W*\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.exec(newsData.url);
        return parsedUrl && parsedUrl[3] || newsData.url;
    }, [newsData.url]);

    const upVote = () => {
        setPoints(points+1);
        onUpVote(newsData);
    }

    const onHideClick = () => {
        setIsHidden(true);
        onHide(newsData);
    };
    
    if (isHidden) {
        return null;
    }

    return (
        <tr className={classNames(blockName, {[`${blockName}--odd`]: index%2} )}>
            <td>
                <div className={`${blockName}__rowContent`}>
                    {newsData.num_comments}
                </div>
            </td>
            <td>
                <div className={`${blockName}__rowContent`}>
                    {points}
                </div>
            </td>
            <td onClick={upVote}>
                <div className={`${blockName}__rowContent`}>
                    <div className={`${blockName}__upVote`}/>
                </div>
            </td>
            <td className={`${blockName}__title`}>
                <div className={`${blockName}__rowContent`}>
                    <div className={`${blockName}__titleMain`}>
                        <a href={newsData.url}>
                            {newsData.title}
                        </a>
                        {
                            host && (<span className={`${blockName}__host`}>
                                        (<a href={`http://${host}`}>{host}</a>)
                                </span>)
                        }
                        
                        <span className={`${blockName}__authorWrapper`}>
                            <span className={`${blockName}__by`}>by</span>
                            <span className={`${blockName}__author`}>
                                {newsData.author}
                            </span>
                        </span>
                        <span className={`${blockName}__time`}>
                            <Moment fromNow ago>{newsData.created_at}</Moment> ago
                        </span>
                        <span className={`${blockName}__hideButton`} onClick={onHideClick}>
                            [ hide ]                            
                        </span>
                    </div>
                    
                </div>
                
            </td>
        </tr>
    )
}

export default News;