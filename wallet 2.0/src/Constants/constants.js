
module.exports = {
    B_URL: 'https://api.sentinelgroup.io',
    BOOT_URL: 'https://bootnode-gateway.sentinelgroup.io',
    TMain_URL: 'http://35.154.179.57:8000',
    S_URL: 'https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=',
    SM_URL: '&address=',
    SE_URL: '&page=1&offset=100&sort=asc&apikey=YourApiKeyToken',
    TM_URL: 'http://localhost:1317',
    TM_FREE_TOKEN_URL: 'http://209.182.217.171:3000',

    notTestItemIcons: [

        // {
        //     'name': 'ETH',
        //     'value': 'eth',
        //     'icon': 'ethereumIcon'
        // },

        {
            'name': 'VpnList',
            'value': 'vpnList',
            'icon': 'vpnHisIcon'
        },

        {
            'name': 'VpnHistory',
            'value': 'vpnHistory',
            'icon': 'listIcon'
        },

        {
            'name': 'Send',
            'value': 'send',
            'icon': 'sendIcon'
        },
        {
            'name': 'Receive',
            'value': 'receive',
            'icon': 'receiveIcon'
        },
        {
            'name': 'TxHistory',
            'value': 'history',
            'icon': 'historyIcon'
        },

    ],

    testMenuItemsIcons: [
        {
            'name': 'VpnList',
            'value': 'vpnList',
            'icon': 'vpnHisIcon'
        },

        {
            'name': 'VpnHistory',
            'value': 'vpnHistory',
            'icon': 'listIcon'
        },

        {
            'name': 'Send',
            'value': 'send',
            'icon': 'sendIcon'
        },
        {
            'name': 'Receive',
            'value': 'receive',
            'icon': 'receiveIcon'
        },
        {
            'name': 'TxHistory',
            'value': 'history',
            'icon': 'historyIcon'
        },
        {
            'name': 'AddNode',
            'value': 'addNode',
            'icon': 'nodeIcon'
        },


    ],
    testMenuItems: [

        {
            'name': 'VpnList',
            'value': 'vpnList',
            'icon': 'vpnHisIcon'
        },

        {
            'name': 'VpnHistory',
            'value': 'vpnHistory',
            'icon': 'listIcon'
        },

        {
            'name': 'Send',
            'value': 'send',
            'icon': 'sendIcon'
        },
        {
            'name': 'Receive',
            'value': 'receive',
            'icon': 'receiveIcon'
        },
        {
            'name': 'TxHistory',
            'value': 'history',
            'icon': 'historyIcon'
        },


    ],
    notInTestMenuItems: [

        {
            'name': 'Send',
            'value': 'send',
            'icon': 'sendIcon'
        },
        {
            'name': 'Receive',
            'value': 'receive',
            'icon': 'receiveIcon'
        },
        {
            'name': 'TxHistory',
            'value': 'history',
            'icon': 'historyIcon'
        },


    ],


    TMdisabledmenuItems: [
        {
            'name': 'Account',
            'value': 'receive',
            'icon': 'receiveIcon'
        }

    ],

    TMrecoverItems: [
        {
            'name': 'Account',
            'value': 'receive',
            'icon': 'createIcon'
        },
        {
            'name': 'Recover',
            'value': 'recover',
            'icon': 'recoverIcon'
        }
    ],
    disabledItemsTest: [
        'swixer',
        'swaps',
    ],
    disabledItemsMain: [
        'vpnHistory',
        'vpnList',
        'addNode'
    ],
    disabledItemsTM: [
        'history',
        'send',
        'vpnList',
        'vpnHistory'
    ]
};
