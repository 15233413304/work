## Router（路由）


- ### router-link（声明式）
````vue
<router-link :to="{ path: '/home' }"></router-link>
<router-link :to="{ name: 'home' }"></router-link>
````
- ### 路由传参

````vue
<router-link :to="{ path: 'Detail', query: { id: a } }">详情a</router-link>
<router-link :to="{ name: 'Detail', params: { id: b } }">详情b</router-link>
````


- ### 编程式（命令式）

  #####  不传参写法
````js
this.$router.push('/home');
this.$router.push({ path: '/home' });
this.$router.push({ name: 'home' });		
````

#####         				传参写法

````js
this.$router.push({ path: '/home', query: { id: 'a' } });
this.$router.push({ name: 'home', query: { id: 'b' } });
this.$router.push({ path: '/home', params: { id: 'a' } });
this.$router.push({ name: 'home', params: { id: 'b' } });
````

- ### 获取参数
````js
this.$route.query.id
this.$route.params.id
````


- ###  传参的两种方式及区别

	### query传参 (类似于get请求)
	不需要配置路由，url后面会显示参数，通过?拼接
	###  params传参(类似于post请求)
	需要配置动态路由
	在路由表的routes配置 path: "/detail/:id"或者path: "/detail:id" 

### 			路由跳转方式

- this.$router.push()
- this.$router.replace()
- this.$router.go(n)

  this.$router.push
  跳转到指定url路径，并向history栈中添加一个记录，点击后退会返回到上一个页面。
  this.$router.replace
  跳转到指定url路径，但是history栈中不会有记录，点击返回会跳转到上上个页面，就是直接替换     了当前页面。
  this.$router.go()
  向前或者向后跳转n个页面，n可为正整数或负整数。



