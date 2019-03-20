# Pocket48-GraphQL
用GraphQL获取SNH48 GROUP成员信息，支持嵌套复杂查询。

Get information of SNH48 Group with GraphQL.

[测试链接 GraphiQL interface](https://pocket48-graphql.app.mikuzz.com/)

# How to use
获取BEJ名字缩写是dyx的同期中在G队前成员的名字和最近的5个直播回放：

```javascript
{
  groups(name: "BEJ") {
    members(name: "dyx") {
      current {
        real_name
        period {
          members(team: "G") {
            former {
              real_name
              nick_name
              lives(count: 5) {
                title
                startTime
                streamPath
              }
            }
          }
        }
      }
    }
  }
}
```

# Running on your own machine

### Production
```sh
npm install
npm run build
npm start
```

### Development
```sh
npm install
npm run dev # Using nodemon for reloading on save
```

# Reference
* ### [pocket48-grab](https://github.com/xsaiting/pocket48-grab/) Pocket48 API