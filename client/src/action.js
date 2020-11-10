import axios from "axios";
// api below are used for getting the latest item saved from the collection
export async function getFirst()
{
  try
    {
    const res = await axios.get('/api/first');
    return res.data;
    }
    catch(err)
    {
        return 0;
    }
}


export async function getSecond()
{
 try
 {
 const res = await axios.get('/api/second');
    return res.data;
    }
    catch(err)
    {
    return 0;
    }           
}

export async function getThird()
{
try
{
const res = await axios.get('/api/third');   
return res.data;
}
 catch(err)
    {return 0};
}

// api above are used for getting the latest item saved from the collection

// api below are used for saving the note into collection
export async function addFirst(note)
{
    console.log(note);
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ note});
    try
    {
        let res = await axios.post("/api/first",body,config);
    console.log(res);
    }
    catch(err)
    {
        console.log(err);
    }
}


export async function addSecond(note)
{console.log(note);
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ note});
    try
    {
        await axios.post("/api/second",body,config);
    }
    catch(err)
    {
        console.log(err);
    }
}


export async function addThird(note)
{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ note});
    try
    {
        await axios.post("/api/third",body,config);
    }
    catch(err)
    {
        console.log(err);
    }
}
// api below are used for saving the note into collection