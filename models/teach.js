const mongoose = require('mongoose');

//<<<< embedded referencing >>>>
// comments
const commentSchema = new mongoose.Schema({
	author: {
		type: String,
		default: 'Anonymous',
	},
	content: String,
	date: Date,
});

// posts
const postSchema = new mongoose.Schema({
	title: String,
	body: String,
	comments: { commentSchema },
});

module.exports = mongoose.model('Post', postSchema);

// How to add a comment to a post
const post = new post({
	title: 'Sweet Shrimp',
	body: 'All about that fish sauce',
});
post.comments.push({ content: 'This is yummy', date: Date.now() });
post.save().then(() => {
	// stuff
});

// Delete a comment
post.findById(req.params.id).then(post => {
	post.id(req.params.commentId).remove();
	post.save();
});

//  *------------------------ Referencing Documents ------------------------*
// products.js
// products
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});

const Product = mongoose.model('Product'.productSchema);

// orders.js
// orders
const orderSchema = new mongoose.Schema({
	orderDate: Date,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

const Order = mongoose.model('Order', orderSchema);

// Access all the products of an order
Order.findById(id)
	.populate('products')
	.then(order => {
		console.log(order.products);
  });
  
  let newOrder = new Order({date: Date.now()})
  let newProduct = new Product({ name: 'Bear', price: 68})
  newOrder.products.push(newProduct)
  newOrder.products.push(new Product({ name: "Toy", price: 80}))
  order.save()