System.register('ionic/storage/sql', ['./storage', 'ionic/util'], function (_export) {
    'use strict';

    var StorageEngine, util, DB_NAME, SqlStorage;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_storage) {
            StorageEngine = _storage.StorageEngine;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }],
        execute: function () {
            DB_NAME = '__ionicstorage';

            /**
             * SqlStorage uses SQLite or WebSQL (development only!) to store data in a
             * persistent SQL store on the filesystem.
             *
             * This is the preferred storage engine, as data will be stored in appropriate
             * app storage, unlike Local Storage which is treated differently by the OS.
             */

            SqlStorage = (function (_StorageEngine) {
                _inherits(SqlStorage, _StorageEngine);

                function SqlStorage(options) {
                    _classCallCheck(this, SqlStorage);

                    _get(Object.getPrototypeOf(SqlStorage.prototype), 'constructor', this).call(this);
                    var dbOptions = util.defaults({
                        name: DB_NAME,
                        backupFlag: SqlStorage.BACKUP_NONE,
                        existingDatabase: false
                    }, options);
                    if (window.sqlitePlugin) {
                        var _location = this._getBackupLocation(dbOptions);
                        this._db = window.sqlitePlugin.openDatabase(util.extend({
                            name: dbOptions.name,
                            location: _location,
                            createFromLocation: dbOptions.existingDatabase ? 1 : 0
                        }, dbOptions));
                    } else {
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        this._db = window.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    this._tryInit();
                }

                _createClass(SqlStorage, [{
                    key: '_getBackupLocation',
                    value: function _getBackupLocation(dbFlag) {
                        switch (dbFlag) {
                            case SqlStorage.BACKUP_LOCAL:
                                return 2;
                            case SqlStorage.BACKUP_LIBRARY:
                                return 1;
                            case SqlStorage.BACKUP_DOCUMENTS:
                                return 0;
                            default:
                                throw Error('Invalid backup flag: ' + dbFlag);
                        }
                    }

                    // Initialize the DB with our required tables
                }, {
                    key: '_tryInit',
                    value: function _tryInit() {
                        this._db.transaction(function (tx) {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [], function (tx, res) {}, function (tx, err) {
                                console.error('Storage: Unable to create initial storage tables', tx, err);
                            });
                        });
                    }

                    /**
                     * Perform an arbitrary SQL operation on the database. Use this method
                     * to have full control over the underlying database through SQL operations
                     * like SELECT, INSERT, and UPDATE.
                     *
                     * @param {string} query the query to run
                     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
                     */
                }, {
                    key: 'query',
                    value: function query(_query) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._db.transaction(function (tx) {
                                ts.executeSql(_query, [], function (tx, res) {
                                    resolve({
                                        tx: tx,
                                        res: res
                                    });
                                }, function (tx, err) {
                                    reject({
                                        tx: tx,
                                        err: err
                                    });
                                });
                            });
                        });
                    }

                    /**
                     * Get the value in the database identified by the given key.
                     * @param {string} key the key
                     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
                     */
                }, {
                    key: 'get',
                    value: function get(key) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            try {
                                _this2._db.transaction(function (tx) {
                                    tx.executeSql("select key, value from kv where key = ? limit 1", [key], function (tx, res) {
                                        if (res.rows.length > 0) {
                                            var item = res.rows.item(0);
                                            resolve(item.value);
                                        }
                                        resolve(null);
                                    }, function (tx, err) {
                                        reject({
                                            tx: tx,
                                            err: err
                                        });
                                    });
                                }, function (err) {
                                    reject(err);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }

                    /**
                    * Set the value in the database for the given key. Existing values will be overwritten.
                    * @param {string} key the key
                    * @param {string} value The value (as a string)
                    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
                    */
                }, {
                    key: 'set',
                    value: function set(key, value) {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            try {
                                _this3._db.transaction(function (tx) {
                                    tx.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value], function (tx, res) {
                                        resolve();
                                    }, function (tx, err) {
                                        reject({
                                            tx: tx,
                                            err: err
                                        });
                                    });
                                }, function (err) {
                                    reject(err);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }

                    /**
                    * Remove the value in the database for the given key.
                    * @param {string} key the key
                    * @param {string} value The value (as a string)
                    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
                    */
                }, {
                    key: 'remove',
                    value: function remove(key) {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            try {
                                _this4._db.transaction(function (tx) {
                                    tx.executeSql('delete from kv where key = ?', [key], function (tx, res) {
                                        resolve();
                                    }, function (tx, err) {
                                        reject({
                                            tx: tx,
                                            err: err
                                        });
                                    });
                                }, function (err) {
                                    reject(err);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }
                }]);

                return SqlStorage;
            })(StorageEngine);

            _export('SqlStorage', SqlStorage);

            SqlStorage.BACKUP_LOCAL = 2;
            SqlStorage.BACKUP_LIBRARY = 1;
            SqlStorage.BACKUP_DOCUMENTS = 0;
        }
    };
});