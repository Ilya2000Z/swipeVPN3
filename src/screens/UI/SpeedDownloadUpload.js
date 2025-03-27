import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ArrowCircle from "../../assets/svg/ArrowCircle";

const SpeedDownloadUpload = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(0); // KB/s
    const [uploadSpeed, setUploadSpeed] = useState(0); // KB/s
    const [lastBytesReceived, setLastBytesReceived] = useState(0);
    const [lastBytesSent, setLastBytesSent] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(Date.now());

  useEffect(() => {
    const monitorSpeed = () => {
        // Пример использования для получения текущего состояния сети
        NetInfo.fetch().then(state => {

            const newReceived = state.details.rxLinkSpeed || 0; // Mbps
            const newSent = state.details.txLinkSpeed || 0; // Mbps
            const currentTime = Date.now();
            const timeDiff = (currentTime - lastTimestamp) / 1000; // Время в секундах
    
            if (timeDiff > 0) {
              const newDownloadSpeed = (newReceived * 1024) / 8; // Перевод Mbps в KB/s
              const newUploadSpeed = (newSent * 1024) / 8; // Перевод Mbps в KB/s
    
              setDownloadSpeed(newDownloadSpeed.toFixed(2));
              setUploadSpeed(newUploadSpeed.toFixed(2));
    
              setLastBytesReceived(newReceived);
              setLastBytesSent(newSent);
              setLastTimestamp(currentTime);
            }
      });
    };

    // Запуск мониторинга каждые 1000 мс (1 сек)
    const interval = setInterval(monitorSpeed, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <View style={styles.transfer}>
      <View style={styles.transferItem}>
        <ArrowCircle style={styles.arrow}/>
        <View style={styles.download}>
          <Text style={styles.downloadText}>Download</Text>
          <View style={styles.speedWrapper}>
            <Text style={styles.speed}>{downloadSpeed}</Text>
            <Text style={styles.speedRate}>KB/s</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />
      <View style={styles.transferItem}>
      <ArrowCircle style={[styles.arrow, styles.arrowUpload]}/>
        <View style={styles.download}>
          <Text style={styles.downloadText}>Upload</Text>
          <View style={styles.speedWrapper}>
            <Text style={styles.speed}>{uploadSpeed}</Text>
            <Text style={styles.speedRate}>KB/s</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    color: '#fff',
    width: 24,
    height: 24,
},
arrowUpload: {
  width: 24,
  height: 24,
  transform: [
      { rotate: '180deg' },
    ],
},
  transfer: {
    height: 48,
    marginLeft: "8%",
    marginRight: "8%",
    flexDirection: "row",
    alignItems: "center",
  },
  transferItem: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  downloadText: {
    color: "#566379",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0.5,
  },
  download: {
    flexDirection: "column",
    columnGap: 4,
    width: "auto",
  },
  speedWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 5,
  },
  speed: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
  },
  speedRate: {
    color: "#566379",
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  line: {
    height: 1,
    width: 40,
    backgroundColor: "#4A4A61",
    transform: [{ rotate: "90deg" }],
  },
});

export default SpeedDownloadUpload;
