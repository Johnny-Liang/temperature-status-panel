import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/ui';
import './css/temperature.css';


export class Temperature extends PureComponent<PanelProps> {
  valueMaps: any;
  events: any;

  constructor(props: Readonly<PanelProps<any>>) {
    super(props);
    this.state = {
      valueMaps: [],
    };
    console.log(this);
  }
  render() {
    return (
      <div>
        <div className="cabinet-wrap">
          {
            this.props.data.state === 'Done' && this.buildCabinet()
          }
        </div>
      </div>
    );
  }
  buildCabinet() {
    let cabinetDom: Array<any> = [];
    let item: any;
    for(item in this.props.data.series) {
      cabinetDom.push(
        <div className="cabinet">
          <span className="num">34°C</span>
          <span className="label normal">{item.name}</span>
        </div>
      )
    }
    return cabinetDom;
  }
  onDataReceived(dataList: any[]) {
    console.log('onDataReceived');
    const dataListLength = dataList.length;
    this.valueMaps = [];
    for (let series = 0; series < dataListLength; series++) {
      this.valueMaps.push({ name: dataList[series].target, value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0] });
    }

    this.render();
  }
}
