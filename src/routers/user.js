const koaBody = require('koa-body');
const router = require('koa-router')();
const User = require('../model/user');

router.get('/users', async (ctx, next) => {
  const user = await User.findAll({
      where: { isdelete: 0 },
  })
  ctx.body = user;
});

router.post('/user', koaBody(), async (ctx) => {
  const user = await User.build(ctx.request.body).save();
  ctx.body = user;
})

router.put('/user/:id', koaBody(), async (ctx) => {
  const body = ctx.request.body;
  const user = await User.findByPk(ctx.params.id);
  await user.update({...body})
  ctx.body = user;
})

router.delete('/user/:id', async (ctx) => {
  const user = await User.findByPk(ctx.params.id).then((user) => user);
  user.isdelete = 1;
  await user.save();
  ctx.body = { success: true }
})

// 登入
router.post('/user/signin', koaBody(), async (ctx) => {
  const body = ctx.request.body;
  await User.findOne({where: {username: body.username}}).then((user) => {
    if (user) {
      if (user.password === body.password) {
        ctx.body = { success: true, message: '登入成功' }
      } else {
        ctx.body = { success: false, message: '密码错误' }
      }
    } else {
      ctx.body = { success: false, message: '用户不存在' }
    }
  }).catch(err => {
    console.error(err, '/user/signin')
  })
})

// 注册
router.post('/user/signup', koaBody(), async (ctx) => {
  const body = ctx.request.body;
  await User.findOne({where: {username: body.username}}).then(async (user) => {
    if (user) {
      ctx.body = { success: false, message: '该用户已被注册' }
    } else if (body.username && body.password) {
      const user = await User.build(ctx.request.body).save();
      ctx.body = user;
    }
  }).catch(err => {
    console.error(err, '/user/signup')
  })
})

module.exports = router;
