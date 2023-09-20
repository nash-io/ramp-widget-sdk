function initializeNash() {
  const nash = new NashRamp({
    base: "eur",
    destination: "0x0000000000000000000000000000000000000000",
    env: "LOCAL",
    referrer: "MyApp",
    target: "usdc",
    blockchain: "eth"
  });
  nash.init({
    width: "480px",
    height: "576px",
  });
}
window.onload = function () {
  initializeNash();
};