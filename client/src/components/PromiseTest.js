export default function PromiseTest(){

  const iterThing = (arr) => {
    for(let i = 0; i < arr.length; i++){
        return arr[i]
      }
  }


   const fetchThings = async () => {
      let newArr = ['a','b','c','d','e','f','g','h']
       
      let result = await iterThing(newArr);

      return (<h4>{result}</h4>)
      

   }

   const thing = fetchThings();

   return(
    <div>
        <h1>Promise Test</h1>
        {thing}
    </div>

   )


    

}