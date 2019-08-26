import Loading from './Loading';
let loadingInstance = null;
function getLoadingInstance(callback) {
    Loading.newInstance({
        hide: true
    }, (instance) => {
        if (loadingInstance) {
            callback && callback(loadingInstance);
            return;
        }
        loadingInstance = instance;
        callback && callback(loadingInstance);
    });
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
//# sourceMappingURL=index.js.map