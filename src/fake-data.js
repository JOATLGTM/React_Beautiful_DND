const data = {
    availableColumns: [
        {
            id: 'startTime',
            name: 'Start Time',
        },
        {
            id: 'stopTime',
            name: 'Stop Time',
        },
        {
            id: 'prePoint',
            name: 'Per Point',
        },
        {
            id: 'initialMargin',
            name: 'Initial Margin',
        },
    ],
    visibleColumns: [
        'Symbol & Description',
        'Change %',
        'Change',
        'Last',
        'Last Volume',
        'Bid',
        'Bid Size',
        'Ask',
        'Ask Size'
    ],
    // visibleColumns: [
    //     {
    //         id: 'symbol&Description',
    //         name: 'Symbol & Description'
    //     }
    // ]
    columns: {
        'availableList': {
            id: 'availableList',
            title: 'Available',
        },
        'visibleList': {
            id: 'visibleList',
            title: 'Visible',
        }
    },

    columnOrder: ['availableList', 'visibleList']
}

export default data