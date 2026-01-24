function SDK() {
  this.queue = [];
  this.isProcessing = false;
  this.count = 1;

  this.log = function (log) {
    this.queue.push(log);
  };

  this.sendAnalyticsEvent = async function () {
    if (this.queue.length === 0 || this.isProcessing) {
      return;
    }
    const task = this.queue.shift();

    try {
      this.isProcessing = true;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.count % 3 === 0) {
            reject();
          } else {
            resolve();
          }
        }, 1000);
      });
      this.count++;
      this.isProcessing = false;
      console.log("Resolved: ", task);
    } catch (error) {
      this.queue.unshift(task);
      console.log("Failed: ", task);
      console.log("retrying: ", task);
      this.count = 1;
      this.isProcessing = false;
    } finally {
      this.sendAnalyticsEvent();
    }
  };
}

const analytics = new SDK();
Array.from({ length: 12 }, (_, i) => {
  analytics.log(`Log ${i}`);
});

analytics.sendAnalyticsEvent();
