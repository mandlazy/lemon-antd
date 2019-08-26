import Loading from './Loading';

let loadingInstance: any = null;

function getLoadingInstance(callback?: any) {
  Loading.newInstance(
    {
      hide: true
    },
    (instance: any) => {
      if (loadingInstance) {
        callback && callback(loadingInstance);
        return;
      }
      loadingInstance = instance;
      callback && callback(loadingInstance);
    }
  );
}

getLoadingInstance();

export default {
  show: () => {
    loadingInstance.triggle(false);
  },
  hide: () => {
    loadingInstance.triggle(true);
  },
  destroy: () => {
    loadingInstance.destroy();
  }
};
