mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;
url = 'mongodb://localhost:27017/netologyMongo';
let user1 = {'name': 'Sergey'},
    user2 = {'name': 'Eugene'},
    user3 = {'name': 'Vlad'},
    user4 = {'name': 'Sergey'}

MongoClient.connect(url, (err, db) => {
    if (err)
    {
        console.log(err)        
    }
    else
    {
        let collection = db.collection('users');
        collection.insert([user1, user2, user3, user4], (err, result) => {
            if (err)
            {
                console.log(err)
            }
            console.log('Были добавлены юзеры:')
            console.log(result.ops)
            collection.updateMany({name: 'Sergey'}, {$set: {name: 'Alex'}}, (err, res) => {
                console.log('Имена Sergey заменены на Alex')
                collection.find({}).toArray((err, res) => {
                    if (err) console.log(err)
                    console.log('Обновленный список имен:')
                    console.log(res)
                    collection.remove({name: 'Alex'}, (err, res) => {
                        if (err) console.log(err)
                        console.log('Удалены имена Alex')
                        console.log(res.result)
                        console.log('Очищаем базу')
                        collection.remove()
                    })
                })
            })
        })
    }
})