const { post } = require("../comment")

const hastags = req.body.content.match() 

if(hastags){
    const result = await Promise.all(
        hashtags.map(tag =>{
            return hashtags.findOrCreate({
                where:{title:tag.slice(1).toLowerCase()},

            })
        }),
    );
    await post.addHashtags(result.map(r=>r[0]);
}