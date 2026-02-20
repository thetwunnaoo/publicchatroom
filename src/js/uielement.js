import { format } from "date-fns";

export function UiElement(divele){

    const userInfoEle = (data)=>{

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime  = data.metadata.creationTime;

        // const getdate = new Date(createdtime).getDate();
        // const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // const getmonth = new Date(createdtime).getMonth();
        // const getyear = new Date(createdtime).getFullYear();

        // const formattedate = `${getdate} ${months[getmonth]} ${getyear}`;

        // cdn 
        // const formattedate = dateFns.format(new Date(createdtime), "do MMM yyyy");
        // console.log(formattedate);

        // npm 
        const formattedate = format(new Date(createdtime), "do MMM yyyy");
        // console.log(formattedate);

        const html = `
            <div id="userinfo" class="text-sm space-y-4">
                <img src="${photourl}" width="80" alt="profile icon" />
                <p>UID : ${uid}</p>
                <p>Display Name : ${fullname}</p>
                <p>Email : ${email}</p>
                <p>Create At : ${formattedate}</p>
            </div>
        `;

        divele.innerHTML = html;

    }

    return {userInfoEle}

}