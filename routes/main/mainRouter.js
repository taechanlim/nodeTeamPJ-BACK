// const express = require('express');
// const router = express.Router();
// const WebSocket = require('ws')

// router.post('/upbit',(req,res)=>{
//     let socket; // 소켓
//     // 웹소켓 연결
//     function connectWS() {
//       if(socket != undefined){
//         socket.close();
//       }
//       socket = new WebSocket("wss://api.upbit.com/websocket/v1");
//       socket.binaryType = 'arraybuffer';
//       socket.on('connection',(ws,req)=>{ 
        
//         ws.id = req.headers['sec-websocket-key']
      

//       ws.onopen   = function(e){
//         filterRequest('[{"ticket":"UNIQUE_TICKET"},{"type":"trade","codes":["KRW-BTC"]}]'); 
//         }
//         //filterRequest -> 데이터 필드값(현재가,거래가,종가,호가 등등)
        
//       ws.onclose  = function(e){
//         socket = undefined;
//       }
//       ws.onmessage= function(e){
//         let enc = new TextDecoder("utf-8");
//         let arr = new Uint8Array(e.data);
//         let str_d = enc.decode(arr);
//         let d = JSON.parse(str_d);
//         console.log(d.trade_price) //->filterRequest에서 거른 데이터들이 d라는 변수에 들어가있는데 객체형태이므로 뽑아서 사용
//         if(d.type == "ticker") { // 현재가 데이터
//         // TODO
//         }
//         if(d.type == "orderbook") { // 호가 데이터
//         // TODO
//         }
//         if(d.type == "trade") { // 체결 데이터
//         // TODO
//         }
    
//         res.json(d)
        
//       }
//     }
//       )}
//     // 웹소켓 연결 해제
//     function closeWS() {
//       if(socket != undefined){
//         socket.close();
//         socket = undefined;
//       }
//     }
//     // 웹소켓 요청
//     function filterRequest(filter) {
//       if(socket == undefined){
//         alert('no connect exists');
//         return;
//       }
//       socket.send(filter);
//     }
//     connectWS();
    
// })


// module.exports = router;