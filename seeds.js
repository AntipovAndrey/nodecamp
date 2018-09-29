const Campground = require('./model/campground');
const Comment = require('./model/comment');

const data = [
    {
        name: `Cloud's Rest`,
        image: 'http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem erat, gravida sit amet justo eget, tempus porta felis. Morbi sagittis arcu a nibh mollis cursus. Phasellus porttitor leo vel auctor cursus. Nulla laoreet dictum ex et tempor. Mauris vestibulum metus nunc, at laoreet diam imperdiet vitae. Quisque ac tempus tellus. Donec ut enim et purus luctus volutpat a et diam. Integer egestas quis elit ultrices viverra. Donec fringilla eu lorem id pulvinar. Donec commodo non neque eget interdum. Vestibulum ac purus enim. Praesent semper et quam quis pharetra. In ornare fringilla velit, in sollicitudin nulla. Proin volutpat vulputate lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum quis convallis tortor. Suspendisse vestibulum lacus metus, sit amet maximus metus pellentesque sit amet. Aenean non scelerisque quam, sed feugiat risus.'
    },
    {
        name: 'Sky Lake',
        image: 'http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-8-1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem erat, gravida sit amet justo eget, tempus porta felis. Morbi sagittis arcu a nibh mollis cursus. Phasellus porttitor leo vel auctor cursus. Nulla laoreet dictum ex et tempor. Mauris vestibulum metus nunc, at laoreet diam imperdiet vitae. Quisque ac tempus tellus. Donec ut enim et purus luctus volutpat a et diam. Integer egestas quis elit ultrices viverra. Donec fringilla eu lorem id pulvinar. Donec commodo non neque eget interdum. Vestibulum ac purus enim. Praesent semper et quam quis pharetra. In ornare fringilla velit, in sollicitudin nulla. Proin volutpat vulputate lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum quis convallis tortor. Suspendisse vestibulum lacus metus, sit amet maximus metus pellentesque sit amet. Aenean non scelerisque quam, sed feugiat risus.'

    },
    {
        name: 'Forest Jump',
        image: 'https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem erat, gravida sit amet justo eget, tempus porta felis. Morbi sagittis arcu a nibh mollis cursus. Phasellus porttitor leo vel auctor cursus. Nulla laoreet dictum ex et tempor. Mauris vestibulum metus nunc, at laoreet diam imperdiet vitae. Quisque ac tempus tellus. Donec ut enim et purus luctus volutpat a et diam. Integer egestas quis elit ultrices viverra. Donec fringilla eu lorem id pulvinar. Donec commodo non neque eget interdum. Vestibulum ac purus enim. Praesent semper et quam quis pharetra. In ornare fringilla velit, in sollicitudin nulla. Proin volutpat vulputate lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum quis convallis tortor. Suspendisse vestibulum lacus metus, sit amet maximus metus pellentesque sit amet. Aenean non scelerisque quam, sed feugiat risus.'
    },
    {
        name: 'Chief Camp',
        image: 'http://falconsafaris.com/wp-content/uploads/2017/08/chief-camp.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem erat, gravida sit amet justo eget, tempus porta felis. Morbi sagittis arcu a nibh mollis cursus. Phasellus porttitor leo vel auctor cursus. Nulla laoreet dictum ex et tempor. Mauris vestibulum metus nunc, at laoreet diam imperdiet vitae. Quisque ac tempus tellus. Donec ut enim et purus luctus volutpat a et diam. Integer egestas quis elit ultrices viverra. Donec fringilla eu lorem id pulvinar. Donec commodo non neque eget interdum. Vestibulum ac purus enim. Praesent semper et quam quis pharetra. In ornare fringilla velit, in sollicitudin nulla. Proin volutpat vulputate lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum quis convallis tortor. Suspendisse vestibulum lacus metus, sit amet maximus metus pellentesque sit amet. Aenean non scelerisque quam, sed feugiat risus.'
    }
];

async function seedDB() {
    await Promise.all([Campground.deleteMany({}).exec(), Comment.deleteMany({}).exec()]);

    for (let seed of data) {
        let campground = Campground.create(seed);
        let comment = Comment.create({
            text: 'In eu orci sit amet purus porta finibus. Morbi at mollis diam. Suspendisse aliquam purus in purus venenatis accumsan. Etiam interdum, elit vitae pulvinar blandit, tortor arcu vehicula sapien, tincidunt mollis felis leo et enim.',
            author: 'andrey'
        });
        campground = await campground;
        comment = await comment;
        campground.comments.push(comment);
        campground.save();
    }
}

module.exports = seedDB;
