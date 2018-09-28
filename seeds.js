const Campground = require('./model/campground');
const Comment = require('./model/comment');

const data = [
    {
        name: `Cloud's Rest`,
        image: 'http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-2.jpg',
        description: 'The best of the two worlds'
    },
    {
        name: 'Sky Lake',
        image: 'http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-8-1.jpg',
        description: `It's like a Haswell`
    },
    {
        name: 'Forest Jump',
        image: 'https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg',
        description: ''
    },
    {
        name: 'Chief Camp',
        image: 'http://falconsafaris.com/wp-content/uploads/2017/08/chief-camp.jpg',
        description: ''
    }
];

async function seedDB() {
    await Promise.all([Campground.deleteMany({}).exec(), Comment.deleteMany({}).exec()]);

    for (let seed of data) {
        let campground = Campground.create(seed);
        let comment = Comment.create({text: 'just a comment', author: 'andrey'});
        campground = await campground;
        comment = await comment;
        campground.comments.push(comment);
        campground.save();
    }
}

module.exports = seedDB;
