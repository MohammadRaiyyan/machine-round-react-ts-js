class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.available = true;
  }
}

class ResourcePool {
  createResource = () => {};
  cleanResource = () => {};

  constructor(createResource, cleanResource, size) {
    this.createResource = createResource;
    this.cleanResource = cleanResource;
    this.resources = new Array(size)
      .fill(0)
      .map(() => this.createResourceItem());
  }

  createResourceItem() {
    const resource = this.cleanResource(this.createResource());
    return new ResourcePoolMember(resource);
  }
  getResource() {
    for (let i = 0; i < this.resources.length; i++) {
      if (this.resources[i].available) {
        this.resources[i].available = false;
        return this.resources[i];
      }
    }
    return null;
  }
  releaseResource(resource) {
    resource.available = true;
    this.cleanResource(resource.data);
  }
}

const createResource = () => {
  return {
    counter: 0,
  };
};

const cleanResource = (obj) => {
  obj.counter = 0;
  delete obj.extraChange;
  return obj;
};

const myPool = new ResourcePool(createResource, cleanResource, 2);

const poolResource1 = myPool.getResource();
console.log("Resource pool 1 booed", poolResource1);
const poolResource2 = myPool.getResource();
console.log("Resource pool 2 booed", poolResource2);
poolResource2.data.extraChange = "hello";
myPool.releaseResource(poolResource2);
const poolResource3 = myPool.getResource();
console.log("Resource pool 3 booed", poolResource3);
