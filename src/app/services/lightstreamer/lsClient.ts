import {ConsoleLogLevel, ConsoleLoggerProvider, LightstreamerClient, StatusWidget} from 'lightstreamer-client-web/lightstreamer.esm'

declare var $:any;

LightstreamerClient.setLoggerProvider(new ConsoleLoggerProvider(ConsoleLogLevel.WARN));

export const lsClient = new LightstreamerClient("https://push.lightstreamer.com","ISSLIVE");
lsClient.addListener(new StatusWidget("left", "0px", true));
lsClient.addListener({
  onStatusChange: function(newStatus) {
    console.log("Client status:" + newStatus);
  }
});
lsClient.connect();