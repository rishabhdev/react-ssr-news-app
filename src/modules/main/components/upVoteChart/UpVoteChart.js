import { Chart } from 'react-charts'
import React, { useMemo } from 'react';

import './UpVoteChart.scss';

const blockName = "upVoteChart";

const UpVoteChart = ({data}) => {
    const chartData = useMemo(
        () => [
          {
            label: 'Series 1',
            data: data.map((item) => [item.objectID, item.points]),
          },
        ],
        [data]
      )
     
      const axes = useMemo(
        () => [
          { primary: true, type: 'ordinal', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
     
      return (
        <div
          className={blockName}
          style={{
            height: '200px'
          }}
        >
          <Chart data={chartData} axes={axes} />
        </div>
      );
};

export default UpVoteChart;