export const NotificationLayout = {
    title:"Notifications",
    subtitle:"",
    content:[
        {
            type:"div",
            content:[]
        },
        {
            type:"hr",
            classes:["margin_top_double","width_full","height_0_2"]
        },   
        {
            type:"div",
            attr:{id:"exit"},
            classes:["button","margin_top_double","mouse"],
            button:{id:"exit",func:"BackFromNotifications"},
            content:[
                {
                    type:"div",
                    classes:["button_image","image_exit"]
                },
                {
                    type:"div",
                    classes:["display_inline","margin_left_half"],
                    text:"Back"
                }
            ]
        }
    ]
}