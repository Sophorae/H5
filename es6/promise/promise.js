var promise=new Promise(function (resolve,reject) {
    setTimeout(function () {
        resolve('success');
    },3000);
});
promise.then(function (data) {
   console.log(data);
});