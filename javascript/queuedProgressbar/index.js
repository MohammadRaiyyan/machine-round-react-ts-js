class TaskProcessor {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.processNext();
  }

  async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const task = this.queue.shift();

    try {
      await task();
    } finally {
      this.isProcessing = false;
      this.processNext();
    }
  }
}
function createProgressTask(container, duration) {
  const taskEl = document.createElement("div");
  taskEl.className = "task";

  const progress = document.createElement("div");
  progress.className = "progress";

  const bar = document.createElement("div");
  bar.className = "bar";

  progress.appendChild(bar);
  taskEl.appendChild(progress);
  container.appendChild(taskEl);

  return () =>
    new Promise((resolve) => {
      const startTime = performance.now();

      function update() {
        const elapsed = performance.now() - startTime;
        const percentage = Math.min((elapsed / duration) * 100, 100);

        bar.style.width = percentage + "%";

        if (percentage >= 100) {
          resolve();
        } else {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
}

const processor = new TaskProcessor();
const tasksContainer = document.getElementById("bars");
const addBtn = document.getElementById("addBarBtn");

addBtn.addEventListener("click", () => {
  const duration = Math.random() * 4000 + 1000;
  const task = createProgressTask(tasksContainer, duration);
  processor.enqueue(task);
});
