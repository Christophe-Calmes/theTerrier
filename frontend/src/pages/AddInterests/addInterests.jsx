import { useAuthContext } from "../../context/AuthProvider";
import DeleteInterestForUser from "../../components/DeleteInterestForUser/DeleteInterestForUser";
import getData from "../../services/utilities";
import React, { useState, useEffect } from "react";
function addInterests() {
    const { currentUser } = useAuthContext();
    const [dataInterests, setDataInterests] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
                setDataInterests(await getData("/interests"))
        }
    }, [dataInterests])
    console.log(dataInterests);
  return (
    <div>
        <section>
        { currentUser &&
        <DeleteInterestForUser DataUserInterests={currentUser.interests} id={currentUser.id}/>
      }  
        </section>
        <section>

        </section>

    </div>
  )
}

export default addInterests