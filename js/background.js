//(function(){
//    chrome.browserAction.onClicked.addListener((tab) => {
//        chrome.tabs.create({url: "option.html"});
//    });
//})();

chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled....');
    scheduleRequest();
    startRequest();
});

chrome.runtime.onStartup.addListener(() => {
    console.log('onStartup....');
    startRequest();
});

chrome.alarms.onAlarm.addListener(alarm => {
    scheduleRequest();
    startRequest();
});

function scheduleRequest() {
    chrome.alarms.create('update', { when: Date.now() + 1000 });
}

async function startRequest() {
    chrome.storage.local.get(data => {
        const lines = String(data['memo']).split(/\r\n|\r|\n/);
        return lines.map((item, index) => {
            const re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
            const result = item.match(re);
            let date = null;
            if (result) {
                date = new Date(result[0]);
            } else {
                const hourReg = /([0-9]|2[0-3]|[01][0-9])時/;
                const hour = item.match(hourReg);
                if (hour) {
                    date = new Date();
                    date.setHours(hour[0].replace(/時/g,''));
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                }
            }
            if (!date) return;
            const time = date.getTime()
            console.log(time);
            if (time <= new Date().getTime()) {
                console.log(result);
                data['ignore'] = data['ignore'] || [];
                if (!data['ignore'].some(item => item == time)) {
                    data['ignore'].push(time);
                    chrome.storage.local.set(data);
                    chrome.notifications.create('MomentaryMemo' + time, {
                        type: 'basic',
                        iconUrl: '/img/icon.png',
                        title: 'MomentaryMemo',
                        message: item,
                        contextMessage: "It's time now",
                        priority: 1
                    });
                    alert(item);
                }
            }
        });
    });
}

