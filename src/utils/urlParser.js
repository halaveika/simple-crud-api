const urlParser =(req) => {
  const parsedReq = req.url.split('/');
  if(parsedReq.length > 3 || parsedReq[1] !=='person') {return []}
  return parsedReq.filter(el => el!=='');
}

module.exports = { urlParser };