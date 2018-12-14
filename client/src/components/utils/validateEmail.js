const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) =>{
  const invalidEmailArrays =  emails
                       .split(',')
                       .map((email)=>email.trim())
                       .filter((email) => {
                         if(email !==","){
                           return !emailRegEx.test(email)
                         }
                       });
  return (invalidEmailArrays.length > 0 ?invalidEmailArrays[0]?invalidEmailArrays:null:null);
}
