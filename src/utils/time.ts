// 获取早上 上午 下午 晚上
export const getTime = () => {
  let msg = '';
  const hours = new Date().getHours();
  if(hours < 9){
    msg = '早上好';
  } else if(hours < 12){
    msg = '上午好';
  } else if(hours < 18){
    msg = '下午好';
  } else {
    msg = '晚上好';
  }
  return msg;
}
