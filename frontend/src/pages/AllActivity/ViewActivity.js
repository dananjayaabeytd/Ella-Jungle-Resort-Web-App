import * as React from "react";

export default function ViewActivity(){
    return (

        <div>
             <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px]" onClick={e=>"AddForm()"}>
             Add Activity
             </button>
        </div>       
    );
}