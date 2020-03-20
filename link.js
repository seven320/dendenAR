/* product */

function makelink(twitter_url, githubID, blog, instagramID, profileURL){
    AFRAME.registerComponent('cursor-listener-icon', {
        init: function (){
            this.el.addEventListener('click', function (evt){
                console.log("icon change")
            })
        }
    })

    AFRAME.registerComponent('cursor-listener-twitter', {
        init: function (){
        this.el.addEventListener('click', function (evt) {
            window.open(twitter_url, null, null)
            });
        }
    });

    AFRAME.registerComponent('cursor-listener-blog',{
        init: function () {
            this.el.addEventListener('click', function (evt) {
                window.open(blog_url, null, null)
            })
        }
    });

    AFRAME.registerComponent('cursor-listener-github',{
        init: function () {
            this.el.addEventListener('click', function (evt) {
                window.open(github_url, null, null)
            })
        }
    });

    AFRAME.registerComponent('cursor-listener-instagram',{
        init: function () {
            this.el.addEventListener('click', function (evt) {
                window.open(instagram_url, null, null)
            })
        }
    });

    AFRAME.registerComponent('cursor-listener-profile',{
        init: function () {
            this.el.addEventListener('click', function (evt) {
                window.open(profile_url, null, null)
            })
        }
    });
}

const twitter_url = "https://twitter.com/yosyuaomenww"
const github_url = "https://github.com/seven320"
const blog_url = "https://denden-seven.hatenablog.com/"
const instagram_url = "https://www.instagram.com/ken_4y4"
const profile_url = "https://denden.app/"

makelink(twitter_url, github_url, blog_url, instagram_url, profile_url)