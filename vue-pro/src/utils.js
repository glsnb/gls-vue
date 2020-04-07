/**
 * @file 自己封装的ajax
 * @author v_guoyu(v_guoyu@baidu.com)
 */
export function ajax(methods, url) {
    const xml = new XMLHttpRequest;
    xml.onreadystatechange = function () {
        if(xml.readyState === 4) {
            if(xml.status === 200) {
                return xml.responseText;
            } else {
                retirn xml.status;
            }
        } else {
            console.log('请求还在继续');
        }
    }
    xml.open(methods, url);
    xml.send();
}