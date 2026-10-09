
  var Module = typeof Module != 'undefined' ? Module : {};

  if (!Module['expectedDataFileDownloads']) Module['expectedDataFileDownloads'] = 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    async function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'F:/Games_Pinkerton/GTA/re3-miami/build/web/reVC-data.data';
      var REMOTE_PACKAGE_BASE = 'reVC-data.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      async function fetchRemotePackage(packageName, packageSize) {
        
        if (!Module['dataFileDownloads']) Module['dataFileDownloads'] = {};
        try {
          var response = await fetch(packageName);
        } catch (e) {
          throw new Error(`Network Error: ${packageName}`, {e});
        }
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.url}`);
        }

        const chunks = [];
        const headers = response.headers;
        const total = Number(headers.get('Content-Length') || packageSize);
        let loaded = 0;

        Module['setStatus'] && Module['setStatus']('Downloading data...');
        const reader = response.body.getReader();

        while (1) {
          var {done, value} = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          Module['dataFileDownloads'][packageName] = {loaded, total};

          let totalLoaded = 0;
          let totalSize = 0;

          for (const download of Object.values(Module['dataFileDownloads'])) {
            totalLoaded += download.loaded;
            totalSize += download.total;
          }

          Module['setStatus'] && Module['setStatus'](`Downloading data... (${totalLoaded}/${totalSize})`);
        }

        const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
        let offset = 0;
        for (const chunk of chunks) {
          packageData.set(chunk, offset);
          offset += chunk.length;
        }
        return packageData.buffer;
      }

    async function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw new Error(msg);
      }
Module['FS_createPath']("/", "Audio", true, true);
Module['FS_createPath']("/", "TEXT", true, true);
Module['FS_createPath']("/", "anim", true, true);
Module['FS_createPath']("/", "data", true, true);
Module['FS_createPath']("/data", "maps", true, true);
Module['FS_createPath']("/data/maps", "airport", true, true);
Module['FS_createPath']("/data/maps", "airportN", true, true);
Module['FS_createPath']("/data/maps", "bank", true, true);
Module['FS_createPath']("/data/maps", "bar", true, true);
Module['FS_createPath']("/data/maps", "bridge", true, true);
Module['FS_createPath']("/data/maps", "cisland", true, true);
Module['FS_createPath']("/data/maps", "club", true, true);
Module['FS_createPath']("/data/maps", "concerth", true, true);
Module['FS_createPath']("/data/maps", "docks", true, true);
Module['FS_createPath']("/data/maps", "downtown", true, true);
Module['FS_createPath']("/data/maps", "downtows", true, true);
Module['FS_createPath']("/data/maps", "golf", true, true);
Module['FS_createPath']("/data/maps", "haiti", true, true);
Module['FS_createPath']("/data/maps", "haitiN", true, true);
Module['FS_createPath']("/data/maps", "hotel", true, true);
Module['FS_createPath']("/data/maps", "islandsf", true, true);
Module['FS_createPath']("/data/maps", "lawyers", true, true);
Module['FS_createPath']("/data/maps", "littleha", true, true);
Module['FS_createPath']("/data/maps", "mall", true, true);
Module['FS_createPath']("/data/maps", "mansion", true, true);
Module['FS_createPath']("/data/maps", "nbeach", true, true);
Module['FS_createPath']("/data/maps", "nbeachbt", true, true);
Module['FS_createPath']("/data/maps", "nbeachw", true, true);
Module['FS_createPath']("/data/maps", "oceandn", true, true);
Module['FS_createPath']("/data/maps", "oceandrv", true, true);
Module['FS_createPath']("/data/maps", "stadint", true, true);
Module['FS_createPath']("/data/maps", "starisl", true, true);
Module['FS_createPath']("/data/maps", "stripclb", true, true);
Module['FS_createPath']("/data/maps", "washintn", true, true);
Module['FS_createPath']("/data/maps", "washints", true, true);
Module['FS_createPath']("/data/maps", "yacht", true, true);
Module['FS_createPath']("/data", "paths", true, true);
Module['FS_createPath']("/", "models", true, true);
Module['FS_createPath']("/", "neo", true, true);
Module['FS_createPath']("/models", "coll", true, true);
Module['FS_createPath']("/models", "generic", true, true);
Module['FS_createPath']("/", "txd", true, true);

        var PACKAGE_UUID = metadata['package_uuid'];
        var IDB_RO = "readonly";
        var IDB_RW = "readwrite";
        var DB_NAME = "EM_PRELOAD_CACHE";
        var DB_VERSION = 1;
        var METADATA_STORE_NAME = 'METADATA';
        var PACKAGE_STORE_NAME = 'PACKAGES';

        async function openDatabase() {
          if (typeof indexedDB == 'undefined') {
            throw new Error('using IndexedDB to cache data can only be done on a web page or in a web worker');
          }
          return new Promise((resolve, reject) => {
            var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
            openRequest.onupgradeneeded = (event) => {
              var db = /** @type {IDBDatabase} */ (event.target.result);

              if (db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
                db.deleteObjectStore(PACKAGE_STORE_NAME);
              }
              var packages = db.createObjectStore(PACKAGE_STORE_NAME);

              if (db.objectStoreNames.contains(METADATA_STORE_NAME)) {
                db.deleteObjectStore(METADATA_STORE_NAME);
              }
              var metadata = db.createObjectStore(METADATA_STORE_NAME);
            };
            openRequest.onsuccess = (event) => {
              var db = /** @type {IDBDatabase} */ (event.target.result);
              resolve(db);
            };
            openRequest.onerror = reject;
          });
        }

        // This is needed as chromium has a limit on per-entry files in IndexedDB
        // https://cs.chromium.org/chromium/src/content/renderer/indexed_db/webidbdatabase_impl.cc?type=cs&sq=package:chromium&g=0&l=177
        // https://cs.chromium.org/chromium/src/out/Debug/gen/third_party/blink/public/mojom/indexeddb/indexeddb.mojom.h?type=cs&sq=package:chromium&g=0&l=60
        // We set the chunk size to 64MB to stay well-below the limit
        var CHUNK_SIZE = 64 * 1024 * 1024;

        async function cacheRemotePackage(db, packageName, packageData, packageMeta) {
          var transactionPackages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
          var packages = transactionPackages.objectStore(PACKAGE_STORE_NAME);
          var chunkSliceStart = 0;
          var nextChunkSliceStart = 0;
          var chunkCount = Math.ceil(packageData.byteLength / CHUNK_SIZE);
          var finishedChunks = 0;

          return new Promise((resolve, reject) => {
            for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
              nextChunkSliceStart += CHUNK_SIZE;
              var putPackageRequest = packages.put(
                packageData.slice(chunkSliceStart, nextChunkSliceStart),
                `package/${packageName}/${chunkId}`
              );
              chunkSliceStart = nextChunkSliceStart;
              putPackageRequest.onsuccess = (event) => {
                finishedChunks++;
                if (finishedChunks == chunkCount) {
                  var transaction_metadata = db.transaction(
                    [METADATA_STORE_NAME],
                    IDB_RW
                  );
                  var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
                  var putMetadataRequest = metadata.put(
                    {
                      'uuid': packageMeta.uuid,
                      'chunkCount': chunkCount
                    },
                    `metadata/${packageName}`
                  );
                  putMetadataRequest.onsuccess = (event) => resolve(packageData);
                  putMetadataRequest.onerror = reject;
                }
              };
              putPackageRequest.onerror = reject;
            }
          });
        }

        /*
         * Check if there's a cached package, and if so whether it's the latest available.
         * Resolves to the cached metadata, or `null` if it is missing or out-of-date.
         */
        async function checkCachedPackage(db, packageName) {
          var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
          var metadata = transaction.objectStore(METADATA_STORE_NAME);
          var getRequest = metadata.get(`metadata/${packageName}`);
          return new Promise((resolve, reject) => {
            getRequest.onsuccess = (event) => {
              var result = event.target.result;
              if (result && PACKAGE_UUID === result['uuid']) {
                resolve(result);
              } else {
                resolve(null);
              }
            }
            getRequest.onerror = reject;
          });
        }

        async function fetchCachedPackage(db, packageName, metadata) {
          var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
          var packages = transaction.objectStore(PACKAGE_STORE_NAME);

          var chunksDone = 0;
          var totalSize = 0;
          var chunkCount = metadata['chunkCount'];
          var chunks = new Array(chunkCount);

          return new Promise((resolve, reject) => {
            for (var chunkId = 0; chunkId < chunkCount; chunkId++) {
              var getRequest = packages.get(`package/${packageName}/${chunkId}`);
              getRequest.onsuccess = (event) => {
                if (!event.target.result) {
                  reject(`CachedPackageNotFound for: ${packageName}`);
                  return;
                }
                // If there's only 1 chunk, there's nothing to concatenate it with so we can just return it now
                if (chunkCount == 1) {
                  resolve(event.target.result);
                } else {
                  chunksDone++;
                  totalSize += event.target.result.byteLength;
                  chunks.push(event.target.result);
                  if (chunksDone == chunkCount) {
                    if (chunksDone == 1) {
                      resolve(event.target.result);
                    } else {
                      var tempTyped = new Uint8Array(totalSize);
                      var byteOffset = 0;
                      for (var chunkId in chunks) {
                        var buffer = chunks[chunkId];
                        tempTyped.set(new Uint8Array(buffer), byteOffset);
                        byteOffset += buffer.byteLength;
                        buffer = undefined;
                      }
                      chunks = undefined;
                      resolve(tempTyped.buffer);
                      tempTyped = undefined;
                    }
                  }
                }
              };
              getRequest.onerror = reject;
            }
          });
        }

      async function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData ' + arrayBuffer.constructor.name);
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          for (var file of metadata['files']) {
            var name = file['filename'];
            var data = byteArray.subarray(file['start'], file['end']);
            // canOwn this data in the filesystem, it is a slice into the heap that will never change
        Module['FS_createDataFile'](name, null, data, true, true, true);
          }
          Module['removeRunDependency']('datafile_F:/Games_Pinkerton/GTA/re3-miami/build/web/reVC-data.data');
      }
      Module['addRunDependency']('datafile_F:/Games_Pinkerton/GTA/re3-miami/build/web/reVC-data.data');

      if (!Module['preloadResults']) Module['preloadResults'] = {};

        async function preloadFallback(error) {
          console.error(error);
          console.error('falling back to default preload behavior');
          await processPackageData(await fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE));
        }

        // reVC web-lite: the page unpacks the data straight into one buffer (Module.reVCLoadPackage), no IndexedDB copy
        if (Module['reVCLoadPackage'] && Module['reVCLoadPackage']()) {
          await processPackageData(await Module['reVCLoadPackage']());
        } else
        try {
          var db = await openDatabase();
          var pkgMetadata = await checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME);
          var useCached = !!pkgMetadata;
          Module['preloadResults'][PACKAGE_NAME] = {fromCache: useCached};
          if (useCached) {
            await processPackageData(await fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, pkgMetadata));
          } else {
            var packageData = await fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
            try {
              await processPackageData(await cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}))
            } catch (error) {
              console.error(error);
              await processPackageData(packageData);
            }
          }
        } catch(e) {
          await preloadFallback(e);
        }

        Module['setStatus'] && Module['setStatus']('Downloading...');

    }
    // Detect whether the module JS file has already been loaded.
    if (Module['FS_createPath']) {
      runWithFS(Module);
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module['preRun'].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/Audio/sfx.RAW", "start": 0, "end": 15044960}, {"filename": "/Audio/sfx.SDT", "start": 15044960, "end": 15243780}, {"filename": "/Audio/sound.cache", "start": 15243780, "end": 15248676}, {"filename": "/TEXT/american.gxt", "start": 15248676, "end": 15672670}, {"filename": "/TEXT/russian.gxt", "start": 15672670, "end": 16095170}, {"filename": "/anim/cuts.dir", "start": 16095170, "end": 16099906}, {"filename": "/anim/cuts.img", "start": 16099906, "end": 33088066}, {"filename": "/anim/ped.ifp", "start": 33088066, "end": 35289218}, {"filename": "/data/WATERPRO.DAT", "start": 35289218, "end": 35310662}, {"filename": "/data/animviewer.dat", "start": 35310662, "end": 35311795}, {"filename": "/data/carcols.dat", "start": 35311795, "end": 35319978}, {"filename": "/data/default.dat", "start": 35319978, "end": 35320508}, {"filename": "/data/default.ide", "start": 35320508, "end": 35341729}, {"filename": "/data/fistfite.dat", "start": 35341729, "end": 35343727}, {"filename": "/data/gta_vc.dat", "start": 35343727, "end": 35346353}, {"filename": "/data/handling.cfg", "start": 35346353, "end": 35372435}, {"filename": "/data/info.zon", "start": 35372435, "end": 35383085}, {"filename": "/data/main.scm", "start": 35383085, "end": 36652218}, {"filename": "/data/map.zon", "start": 36652218, "end": 36654407}, {"filename": "/data/maps/airport/airport.col", "start": 36654407, "end": 36978619}, {"filename": "/data/maps/airport/airport.ide", "start": 36978619, "end": 36995153}, {"filename": "/data/maps/airport/airport.ipl", "start": 36995153, "end": 37033290}, {"filename": "/data/maps/airportN/airportN.col", "start": 37033290, "end": 37244270}, {"filename": "/data/maps/airportN/airportN.ide", "start": 37244270, "end": 37249037}, {"filename": "/data/maps/airportN/airportN.ipl", "start": 37249037, "end": 37270239}, {"filename": "/data/maps/bank/bank.col", "start": 37270239, "end": 37287455}, {"filename": "/data/maps/bank/bank.ide", "start": 37287455, "end": 37295247}, {"filename": "/data/maps/bank/bank.ipl", "start": 37295247, "end": 37300288}, {"filename": "/data/maps/bar/bar.ide", "start": 37300288, "end": 37300332}, {"filename": "/data/maps/bridge/bridge.col", "start": 37300332, "end": 37399888}, {"filename": "/data/maps/bridge/bridge.ide", "start": 37399888, "end": 37401960}, {"filename": "/data/maps/bridge/bridge.ipl", "start": 37401960, "end": 37406851}, {"filename": "/data/maps/cisland/cisland.col", "start": 37406851, "end": 37628143}, {"filename": "/data/maps/cisland/cisland.ide", "start": 37628143, "end": 37637332}, {"filename": "/data/maps/cisland/cisland.ipl", "start": 37637332, "end": 37663236}, {"filename": "/data/maps/club/CLUB.col", "start": 37663236, "end": 37687248}, {"filename": "/data/maps/club/CLUB.ipl", "start": 37687248, "end": 37694272}, {"filename": "/data/maps/club/club.ide", "start": 37694272, "end": 37703712}, {"filename": "/data/maps/concerth/concerth.col", "start": 37703712, "end": 37714292}, {"filename": "/data/maps/concerth/concerth.ide", "start": 37714292, "end": 37722559}, {"filename": "/data/maps/concerth/concerth.ipl", "start": 37722559, "end": 37724400}, {"filename": "/data/maps/cull.ipl", "start": 37724400, "end": 37781517}, {"filename": "/data/maps/docks/docks.col", "start": 37781517, "end": 38077961}, {"filename": "/data/maps/docks/docks.ide", "start": 38077961, "end": 38087322}, {"filename": "/data/maps/docks/docks.ipl", "start": 38087322, "end": 38117876}, {"filename": "/data/maps/downtown/downtown.col", "start": 38117876, "end": 38622664}, {"filename": "/data/maps/downtown/downtown.ide", "start": 38622664, "end": 38645713}, {"filename": "/data/maps/downtown/downtown.ipl", "start": 38645713, "end": 38701051}, {"filename": "/data/maps/downtows/downtows.col", "start": 38701051, "end": 38957315}, {"filename": "/data/maps/downtows/downtows.ide", "start": 38957315, "end": 38964301}, {"filename": "/data/maps/downtows/downtows.ipl", "start": 38964301, "end": 38990992}, {"filename": "/data/maps/generic.ide", "start": 38990992, "end": 39013119}, {"filename": "/data/maps/golf/golf.col", "start": 39013119, "end": 39373939}, {"filename": "/data/maps/golf/golf.ide", "start": 39373939, "end": 39379654}, {"filename": "/data/maps/golf/golf.ipl", "start": 39379654, "end": 39397218}, {"filename": "/data/maps/haiti/haiti.col", "start": 39397218, "end": 39749750}, {"filename": "/data/maps/haiti/haiti.ide", "start": 39749750, "end": 39755714}, {"filename": "/data/maps/haiti/haiti.ipl", "start": 39755714, "end": 39794925}, {"filename": "/data/maps/haitiN/haitiN.ide", "start": 39794925, "end": 39800866}, {"filename": "/data/maps/haitiN/haitin.col", "start": 39800866, "end": 40102210}, {"filename": "/data/maps/haitiN/haitin.ipl", "start": 40102210, "end": 40128892}, {"filename": "/data/maps/hotel/hotel.col", "start": 40128892, "end": 40140072}, {"filename": "/data/maps/hotel/hotel.ide", "start": 40140072, "end": 40144833}, {"filename": "/data/maps/hotel/hotel.ipl", "start": 40144833, "end": 40153868}, {"filename": "/data/maps/islandsf/islandsf.col", "start": 40153868, "end": 40162424}, {"filename": "/data/maps/islandsf/islandsf.ide", "start": 40162424, "end": 40166428}, {"filename": "/data/maps/islandsf/islandsf.ipl", "start": 40166428, "end": 40176808}, {"filename": "/data/maps/lawyers/lawyers.col", "start": 40176808, "end": 40192600}, {"filename": "/data/maps/lawyers/lawyers.ide", "start": 40192600, "end": 40193698}, {"filename": "/data/maps/lawyers/lawyers.ipl", "start": 40193698, "end": 40195136}, {"filename": "/data/maps/littleha/littleha.col", "start": 40195136, "end": 40562696}, {"filename": "/data/maps/littleha/littleha.ide", "start": 40562696, "end": 40578269}, {"filename": "/data/maps/littleha/littleha.ipl", "start": 40578269, "end": 40647176}, {"filename": "/data/maps/mall/mall.col", "start": 40647176, "end": 40849668}, {"filename": "/data/maps/mall/mall.ide", "start": 40849668, "end": 40859692}, {"filename": "/data/maps/mall/mall.ipl", "start": 40859692, "end": 40883740}, {"filename": "/data/maps/mansion/mansion.col", "start": 40883740, "end": 41036616}, {"filename": "/data/maps/mansion/mansion.ide", "start": 41036616, "end": 41046300}, {"filename": "/data/maps/mansion/mansion.ipl", "start": 41046300, "end": 41061539}, {"filename": "/data/maps/map0.dat", "start": 41061539, "end": 41062230}, {"filename": "/data/maps/map1.dat", "start": 41062230, "end": 41062921}, {"filename": "/data/maps/map2.dat", "start": 41062921, "end": 41063612}, {"filename": "/data/maps/map3.dat", "start": 41063612, "end": 41064303}, {"filename": "/data/maps/map4.dat", "start": 41064303, "end": 41064994}, {"filename": "/data/maps/map5.dat", "start": 41064994, "end": 41065685}, {"filename": "/data/maps/map6.dat", "start": 41065685, "end": 41066376}, {"filename": "/data/maps/map7.dat", "start": 41066376, "end": 41067067}, {"filename": "/data/maps/nbeach/nbeach.col", "start": 41067067, "end": 41423767}, {"filename": "/data/maps/nbeach/nbeach.ide", "start": 41423767, "end": 41429426}, {"filename": "/data/maps/nbeach/nbeach.ipl", "start": 41429426, "end": 41472715}, {"filename": "/data/maps/nbeachbt/nbeachbt.col", "start": 41472715, "end": 41968103}, {"filename": "/data/maps/nbeachbt/nbeachbt.ide", "start": 41968103, "end": 41978474}, {"filename": "/data/maps/nbeachbt/nbeachbt.ipl", "start": 41978474, "end": 42053380}, {"filename": "/data/maps/nbeachw/nbeachw.col", "start": 42053380, "end": 42314960}, {"filename": "/data/maps/nbeachw/nbeachw.ide", "start": 42314960, "end": 42324418}, {"filename": "/data/maps/nbeachw/nbeachw.ipl", "start": 42324418, "end": 42365783}, {"filename": "/data/maps/oceandn/oceandN.col", "start": 42365783, "end": 42656475}, {"filename": "/data/maps/oceandn/oceandN.ide", "start": 42656475, "end": 42677127}, {"filename": "/data/maps/oceandn/oceandN.ipl", "start": 42677127, "end": 42754857}, {"filename": "/data/maps/oceandrv/oceandrv.col", "start": 42754857, "end": 42931965}, {"filename": "/data/maps/oceandrv/oceandrv.ide", "start": 42931965, "end": 42945394}, {"filename": "/data/maps/oceandrv/oceandrv.ipl", "start": 42945394, "end": 42996060}, {"filename": "/data/maps/paths.ipl", "start": 42996060, "end": 44167616}, {"filename": "/data/maps/stadint/stadint.col", "start": 44167616, "end": 44600952}, {"filename": "/data/maps/stadint/stadint.ide", "start": 44600952, "end": 44611430}, {"filename": "/data/maps/stadint/stadint.ipl", "start": 44611430, "end": 44618787}, {"filename": "/data/maps/starisl/starisl.col", "start": 44618787, "end": 44865307}, {"filename": "/data/maps/starisl/starisl.ide", "start": 44865307, "end": 44869411}, {"filename": "/data/maps/starisl/starisl.ipl", "start": 44869411, "end": 44908821}, {"filename": "/data/maps/stripclb/stripclb.col", "start": 44908821, "end": 44937813}, {"filename": "/data/maps/stripclb/stripclb.ide", "start": 44937813, "end": 44943020}, {"filename": "/data/maps/stripclb/stripclb.ipl", "start": 44943020, "end": 44944208}, {"filename": "/data/maps/washintn/washintn.col", "start": 44944208, "end": 45219320}, {"filename": "/data/maps/washintn/washintn.ide", "start": 45219320, "end": 45237132}, {"filename": "/data/maps/washintn/washintn.ipl", "start": 45237132, "end": 45320926}, {"filename": "/data/maps/washints/washints.col", "start": 45320926, "end": 45630130}, {"filename": "/data/maps/washints/washints.ide", "start": 45630130, "end": 45651799}, {"filename": "/data/maps/washints/washints.ipl", "start": 45651799, "end": 45719923}, {"filename": "/data/maps/yacht/yacht.col", "start": 45719923, "end": 45744859}, {"filename": "/data/maps/yacht/yacht.ide", "start": 45744859, "end": 45747272}, {"filename": "/data/maps/yacht/yacht.ipl", "start": 45747272, "end": 45747357}, {"filename": "/data/navig.zon", "start": 45747357, "end": 45748130}, {"filename": "/data/object.dat", "start": 45748130, "end": 45774838}, {"filename": "/data/occlu.ipl", "start": 45774838, "end": 45796911}, {"filename": "/data/particle.cfg", "start": 45796911, "end": 45814470}, {"filename": "/data/paths/flight.dat", "start": 45814470, "end": 45822846}, {"filename": "/data/paths/flight2.dat", "start": 45822846, "end": 45826460}, {"filename": "/data/paths/flight3.dat", "start": 45826460, "end": 45838750}, {"filename": "/data/paths/spath0.dat", "start": 45838750, "end": 45840636}, {"filename": "/data/ped.dat", "start": 45840636, "end": 45842702}, {"filename": "/data/pedgrp.dat", "start": 45842702, "end": 45851210}, {"filename": "/data/pedstats.dat", "start": 45851210, "end": 45854489}, {"filename": "/data/surface.dat", "start": 45854489, "end": 45855065}, {"filename": "/data/timecyc.dat", "start": 45855065, "end": 45901594}, {"filename": "/data/water.dat", "start": 45901594, "end": 45902913}, {"filename": "/data/weapon.dat", "start": 45902913, "end": 45909821}, {"filename": "/models/INTRO.TXD", "start": 45909821, "end": 45994557}, {"filename": "/models/MISC.TXD", "start": 45994557, "end": 46018533}, {"filename": "/models/coll/generic.col", "start": 46018533, "end": 46103305}, {"filename": "/models/coll/peds.col", "start": 46103305, "end": 46124782}, {"filename": "/models/coll/vehicles.col", "start": 46124782, "end": 46230378}, {"filename": "/models/coll/weapons.col", "start": 46230378, "end": 46230826}, {"filename": "/models/fonts.txd", "start": 46230826, "end": 46755410}, {"filename": "/models/fonts_r.txd", "start": 46755410, "end": 47279994}, {"filename": "/models/fronten1.txd", "start": 47279994, "end": 47478050}, {"filename": "/models/fronten2.txd", "start": 47478050, "end": 48226634}, {"filename": "/models/generic.txd", "start": 48226634, "end": 48489202}, {"filename": "/models/generic/air_vlo.DFF", "start": 48489202, "end": 48496118}, {"filename": "/models/generic/arrow.DFF", "start": 48496118, "end": 48500967}, {"filename": "/models/generic/player.bmp", "start": 48500967, "end": 48567579}, {"filename": "/models/generic/wheels.DFF", "start": 48567579, "end": 48663646}, {"filename": "/models/generic/wheels.TXD", "start": 48663646, "end": 48687622}, {"filename": "/models/generic/zonecylb.DFF", "start": 48687622, "end": 48689882}, {"filename": "/models/gta3.dir", "start": 48689882, "end": 48883258}, {"filename": "/models/gta3.img", "start": 48883258, "end": 226092602}, {"filename": "/models/hud.txd", "start": 226092602, "end": 226199778}, {"filename": "/models/particle.txd", "start": 226199778, "end": 226654474}, {"filename": "/txd/INTRO3.TXD", "start": 226654474, "end": 226917810}, {"filename": "/txd/LOADSC0.TXD", "start": 226917810, "end": 227181146}, {"filename": "/txd/LOADSC1.TXD", "start": 227181146, "end": 227444482}, {"filename": "/txd/LOADSC10.TXD", "start": 227444482, "end": 227707818}, {"filename": "/txd/LOADSC11.TXD", "start": 227707818, "end": 227971154}, {"filename": "/txd/LOADSC12.TXD", "start": 227971154, "end": 228234490}, {"filename": "/txd/LOADSC13.TXD", "start": 228234490, "end": 228497826}, {"filename": "/txd/LOADSC2.TXD", "start": 228497826, "end": 228761162}, {"filename": "/txd/LOADSC3.TXD", "start": 228761162, "end": 229024498}, {"filename": "/txd/LOADSC4.TXD", "start": 229024498, "end": 229287834}, {"filename": "/txd/LOADSC5.TXD", "start": 229287834, "end": 229551170}, {"filename": "/txd/LOADSC6.TXD", "start": 229551170, "end": 229814506}, {"filename": "/txd/LOADSC7.TXD", "start": 229814506, "end": 230077842}, {"filename": "/txd/LOADSC8.TXD", "start": 230077842, "end": 230341178}, {"filename": "/txd/LOADSC9.TXD", "start": 230341178, "end": 230604514}, {"filename": "/txd/SPLASH1.TXD", "start": 230604514, "end": 230736778}, {"filename": "/txd/SPLASH2.TXD", "start": 230736778, "end": 230869042}, {"filename": "/txd/SPLASH3.TXD", "start": 230869042, "end": 230869082}, {"filename": "/txd/intro1.txd", "start": 230869082, "end": 231132418}, {"filename": "/txd/intro2.txd", "start": 231132418, "end": 231395754}, {"filename": "/txd/intro4.txd", "start": 231395754, "end": 231659090}, {"filename": "/txd/outro.txd", "start": 231659090, "end": 231922426}, {"filename": "/neo/neo.txd", "start": 231922426, "end": 231951394}, {"filename": "/neo/carTweakingTable.dat", "start": 231951394, "end": 231958781}, {"filename": "/neo/rimTweakingTable.dat", "start": 231958781, "end": 231967655}, {"filename": "/neo/worldTweakingTable.dat", "start": 231967655, "end": 231968868}, {"filename": "/txd/intro1_en.txd", "start": 231968868, "end": 232232204}, {"filename": "/txd/intro2_en.txd", "start": 232232204, "end": 232495540}, {"filename": "/txd/intro3_en.txd", "start": 232495540, "end": 232758876}, {"filename": "/txd/intro4_en.txd", "start": 232758876, "end": 233022212}, {"filename": "/Audio/RADIO.mp3", "start": 233022212, "end": 233652593}], "remote_package_size": 233652593, "package_uuid": "sha256-16ee456d8562e7887923a957f9d30fadf5b061dc984547ccf82761141d85aa02"});

  })();
