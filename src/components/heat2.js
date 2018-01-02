import React, { Component } from 'react';
import ReactHeatmap from 'react-heatmap';

class Heat2 extends Component {
  return_graph() {
      var result 	= [];
      var t_start = Math.round(Math.random() * 10 - 0.5); // 0 - 10
      var len 	= Math.round(Math.random() * 150 + 150);  // 150 - 300
      // The *10 is necessary because timesteps are made with 10ms
      var mean 	= Math.round(len / 2 + (10 - Math.random() * 20)) * 10; // len/2 +- 10
      var amp  	= Math.round(Math.random() * 200 + 400);
      var spread  = Math.round(Math.random() * 20 + 50) * 10;
      for (var i = 0; i < len; i++) {
        var t = t_start + i * 10;
        result.push({
          x: t / 30,
          y:  Math.round(this.normal_dist(t, amp * spread, mean, spread) / 3)
        });
      }

      return result;
    }

  normal_dist(x, u, m, s) {
    return ((u / (s * Math.sqrt(2 * Math.PI))) * Math.exp((-1/2)*Math.pow(((x - m) / s),2)));
  }

  create_data(){
    var data = [];
    for (var i = 0; i < 200; i++) data.push(this.return_graph());
    return data;
  }

  compare(a,b) {
    if (a.x<b.x) {return -1;}
    //if a.x is equal with b.x then sort y
    if (a.x===b.x && a.y<b.y) {return -1;}
    if (a.x===b.x && a.y===b.y) {return 0;}
    if (a.x===b.x && a.y>b.y) {return 1;}
    if (a.x>b.x) {return 1;}
    return 0;
  }

  serialize_norm_data(data) {
    var serial = [];
    console.log(data);
    data.map(sub => sub.map( item => serial.push(item)));
    const yMax=Math.max.apply(Math,serial.map(function(o){return o.y;}));
    const xMax=Math.max.apply(Math,serial.map(function(o){return o.x;}));
    console.log(yMax,xMax);
    //sort dataset asc
    serial.sort(this.compare);
    //norm dataset to 0-100
    var norm_data = serial.map(item => {
      var temp = { x: item.x/xMax*100 , y: item.y/yMax*100 };
      return temp;
    });
    console.log(norm_data);
    console.log(this.props.width);
    console.log(Math.max.apply(Math,norm_data.map(function(o){return o.y;})))

    return norm_data;
  }
  //data's value must be 0-100 and sorted (returns from serialize_norm_data)
  clustered_data(data) {
    var cluster=[];
    var x=0;
    //this is y of mean node
    var mean=this.props.width/2;
    var radius=this.props.width/2;
    var value=0;
    var maxVal=0;
    for ( var i=0;i<data.length;i++) {
      //check if x is still the same (else we need to start again from radius)
      if (x=== data[i].x) {
        //if y is between mean's radius increase the value
        if (data[i].y>=mean-radius && data[i].y<mean+radius) {
          value++;
          // get max Value for y since we need it in heatmap
          if ( value>maxVal) { maxVal=value;}
        }
        // if x isnt equal to data[i].x we push that node in clustered_data with x= data[i].x value=value y=mean
        //  and start again with next mean
        else {
          //dont insert mean nodes with no neighbors
          if ( value>0) {
            cluster.push({x:x, y:mean, value:value});
          }
          value=1;
          //we skip a mean node if there isn't data for it( y: 1, 3, 5, 25  we skip node with y :15)
          while( mean <= data[i].y-radius) {
            mean=mean+this.props.width;
          }
        }
      }
      // if x isnt equal to data[i].x then add that node in clustered and continue (we reached node with y 95)
      else {
        cluster.push({x:x, y:mean, value:value});
        x=data[i].x;
        mean=radius;
        value=0;
      }
    }
    return {cluster: cluster, maxVal: maxVal};
  }

  render() {
          var data = this.serialize_norm_data(this.create_data());
          console.log("Data = ");
          console.log(data);
          var cluster=this.clustered_data(data);
          console.log("Clustered Data = ");
          console.log(cluster.cluster);
          console.log(cluster.maxVal);
          //transform rotateX 180degrees since heatmap starts 0.0 from top left
          return (
              <div style={{ width: 500, height: 500, transform: 'rotateX(180deg)' }} >
                  <ReactHeatmap max={cluster.maxVal} data={cluster.cluster} />
              </div>
          )

      }

}
// add width prop default value 10 if not provided
Heat2.defaultProps = {
  width:10,
};

export default Heat2;
