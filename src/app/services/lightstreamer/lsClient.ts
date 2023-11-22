import {ConsoleLogLevel, ConsoleLoggerProvider, LightstreamerClient, StatusWidget} from 'lightstreamer-client-web/lightstreamer.esm'

declare var $:any;

LightstreamerClient.setLoggerProvider(new ConsoleLoggerProvider(ConsoleLogLevel.WARN));

export const lsClient = new LightstreamerClient("http://20.90.66.153:8080","NUTCRACKER");
lsClient.addListener({
  onStatusChange: function(newStatus) {
    console.log("Client status:" + newStatus);
  }
});