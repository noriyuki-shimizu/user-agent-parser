import UAParser from 'ua-parser-js';

const UNKNOWN_UA_LIST: ReadonlyArray<string> = [
  // user agent 一覧
  // ex) Mozilla/5.0 (iPad; CPU OS 12_5_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1
];

const getNo = (osName: string = '', deviceType: string = '', browserName: string = ''): number => {
  const lowerOsName = osName.toLowerCase();
  const lowerDeviceType = deviceType.toLowerCase();
  const lowerBrowserName = browserName.toLowerCase();

  if (lowerOsName.includes('windows') && !lowerDeviceType && lowerBrowserName.includes('ie')) {
    return 1;
  } else if (lowerOsName.includes('windows') && !lowerDeviceType && lowerBrowserName.includes('edge')) {
    return 2;
  } else if (lowerOsName.includes('windows') && !lowerDeviceType && lowerBrowserName.includes('chrome')) {
    return 3;
  } else if (lowerOsName.includes('windows') && !lowerDeviceType && lowerBrowserName.includes('firefox')) {
    return 4;
  } else if (lowerOsName.includes('windows') && !lowerDeviceType) {
    return 5;
  } else if (lowerOsName.includes('mac') && !lowerDeviceType && lowerBrowserName.includes('safari')) {
    return 6;
  } else if (lowerOsName.includes('mac') && !lowerDeviceType && lowerBrowserName.includes('chrome')) {
    return 7;
  } else if (lowerOsName.includes('mac') && !lowerDeviceType && lowerBrowserName.includes('firefox')) {
    return 8;
  } else if (lowerOsName.includes('mac') && !lowerDeviceType) {
    return 9;
  } else if (lowerOsName.includes('android') && lowerDeviceType.includes('mobile') && lowerBrowserName.includes('chrome')) {
    return 10;
  } else if (lowerOsName.includes('android') && lowerDeviceType.includes('mobile')) {
    return 11;
  } else if (lowerOsName.includes('android') && lowerDeviceType.includes('tablet') && lowerBrowserName.includes('chrome')) {
    return 12;
  } else if (lowerOsName.includes('android') && lowerDeviceType.includes('tablet')) {
    return 13;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('mobile') && lowerBrowserName.includes('safari')) {
    return 14;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('mobile') && lowerBrowserName.includes('chrome')) {
    return 15;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('mobile')) {
    return 16;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('tablet') && lowerBrowserName.includes('safari')) {
    return 17;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('tablet') && lowerBrowserName.includes('chrome')) {
    return 18;
  } else if (lowerOsName.includes('ios') && lowerDeviceType.includes('tablet')) {
    return 19;
  }

  return 99;
}

(() => {
    const result = UNKNOWN_UA_LIST.map<string>(unknownUA => {
      try {
        const uaParser = new UAParser(unknownUA);

        const browser = uaParser.getBrowser()
        const os = uaParser.getOS();
        const device = uaParser.getDevice()
        const no = getNo(os.name, device.type, browser.name);

        return `${
          unknownUA
        }	${
          browser.name || '--'
        }	${
          browser.version || '--'
        }	${
          os.name || '--'
        }	${
          os.version || '--'
        }	${
          device.model || '--'
        }	${
          device.type || '--'
        }	${
          no
        }`
      } catch(e) {
        console.log(e)
        return `${unknownUA}	unknown...`
      }
    }).join('\n')

    console.log(result)
})();
