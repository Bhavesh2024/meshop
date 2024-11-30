import React, { useEffect } from 'react'

const PaginationData = ({tableData,data,handler,children,activeIndex,rows=3}) => {
  const createPagination = (data, rows,setSlicedRowData) => {
    const isObject = Array.isArray(data);
    const dividedDataArr = [];
    let totalDataLength = 0;
    console.log(data);
    console.log(isObject)
    if (!isObject) {
      // console.log(Object.values(data));
      // console.log('hello')
      const dataArr = Object.values(data);
      dataArr.map((value, index) => {
        totalDataLength = totalDataLength + value.length;
      });
      if (totalDataLength > 5) {
        const remainingLength = totalDataLength % rows;
        dataArr.forEach((value, index) => {
          let minIndex = 0,
      maxIndex = rows;
          value.map((data, index) => {
            if (minIndex == index) {
              // console.log("data : ");
              if (dividedDataArr.length != 0) {
                dividedDataArr.map((arr) => {
                  if (
                    arr.length < rows &&
                    arr.length != rows
                  ) {
                    let currentIndex = index;
                    while (arr.length != rows) {
                      arr.push(value[currentIndex]);
                      currentIndex += 1;
                    }
                    minIndex = currentIndex;
                    maxIndex = rows + minIndex;
                  }
                });
              }
  
              dividedDataArr.push(
                value.slice(minIndex, maxIndex)
              );
              // pagination.push(dividedDataArr.length);
              minIndex = maxIndex;
              maxIndex =
                minIndex < value.length
                  ? minIndex + rows
                  : minIndex + (value.length % rows);
            }
          });
          console.log(dividedDataArr)
          setSlicedRowData(dividedDataArr);
          // setPagination(pagination.push(dividedDataArr.length));
        });
      }
    }else{
        totalDataLength = data.length;
        // console.log('hello' + data.length)
        console.log('length ' + totalDataLength)
        if(totalDataLength > 3){
           data.map((value,index) =>{
            // console.log(value)
             let minIndex = 0,
maxIndex = rows;
              if(minIndex == index){
                  if(dividedDataArr.length != 0){
                     dividedDataArr.map((arr) =>{
                       if(arr.length < rows && arr.length != rows){
                          let currentIndex = index;
                         while(arr.length != rows){
                          arr.push(data[currentIndex]);
                          currentIndex += 1;
                         }
                         minIndex = currentIndex;
                         maxIndex = rows + minIndex;
                       }
                     })
                  }
                  dividedDataArr.push(data.slice(minIndex,maxIndex));
                  minIndex = maxIndex;
                  maxIndex = minIndex < value.length ? minIndex + rows : minIndex + (value.length % rows);
                }
              });
              setSlicedRowData(dividedDataArr);
        }
    }
  
    // console.log(slicedRowData);
  };
  useEffect(() =>{
             console.log(tableData);
          if(data.length == 0){

            createPagination(tableData,rows,handler)
          }
          // console.log(data)
    
  },[tableData])
  return (
    <>
        {
          (data.length !== 0 ) && data.map((value,index) => (
						index == activeIndex &&
						value.map((value,index) => (

						<tr
							key={index}
						>
							{React.cloneElement(children,value)}
						</tr>
						))
					))}
        
    </>
  )
}

export default PaginationData
