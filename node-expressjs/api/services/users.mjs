import ds from "datascript";
import _ from "lodash";
import { v4 as uuid } from "uuid";

const schema = {
    ":user/userId": { ":db/unique": ":db.unique/identity" },
    ":user/email": { ":db/unique": ":db.unique/value" },
    ":user/address": {
        ":db/valueType": ":db.type/ref",
        ":db/isComponent": true,
    },
};

const conn = ds.create_conn(schema);

const usersService = {
    conn,
    lastTx: null,
    registerUser(user) {
        const entity = _.merge(
            keywordize("user", user),
            keywordize("user", {
                userId: uuid(),
                password: generatePassword(),
            })
        );
        usersService.lastTx = ds.transact(conn, [entity]);
        return objectify(entity);
    },
    getUser(id, key = ":user/userId") {
        const db = ds.db(conn);
        const userEntity = ds.pull(db, "[*]", [key, id]);
        return objectify(userEntity);
    },
    find() {
        const db = ds.db(conn);
        const userEntity = ds.q(
            '[:find [(pull ?id [*]) ...] :where [?id ":user/userId" ?uid]]',
            db
        );
        return objectify(userEntity);
    },
};

export default usersService;

function generatePassword() {
    var length = 8,
        charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function transformObjectGraph(obj, transform) {
    if (_.isArray(obj)) {
        return obj.map((item) => transformObjectGraph(item, transform));
    }
    if (!_.isObject(obj)) {
        return obj;
    }
    return _(obj)
        .map(transform)
        .reduce((m, [k, v]) => {
            m[k] = v;
            return m;
        }, {});
}

function keywordize(prefix, obj) {
    return transformObjectGraph(obj,
        (v, k) => [`:${prefix}/${k}`, keywordize(`${prefix}.${k}`, v)]
    );
}

function name(keyword) {
    if (!_.isString(keyword)) {
        throw new Error("Not a keyword");
    }
    if (keyword[0] !== ":") {
        return keyword;
    }
    return keyword.slice(1).split("/").at(-1);
}

function objectify(obj) {
    return transformObjectGraph(obj,
        (v, k) => [name(k), objectify(v)]
    );
}
