/* product */

function makelink(twitterID, githubID, blog, instagramID, profileURL){
    console.log("makelink")

    if(twitterID.length > 0){
        AFRAME.registerComponent('cursor-listener-twitter', {
            init: function (){
            const base_twitter = "https://twitter.com"
            var twitter_url = `${base_twitter}/${twitterID}`
            this.el.addEventListener('click', function (evt) {
                window.open(twitter_url, null, null)
                });
            }
        });
    }

    if(blog.length > 0){
        AFRAME.registerComponent('cursor-listener-blog',{
            init: function () {
                var blog_url = `${blog}`
                this.el.addEventListener('click', function (evt) {
                    window.open(blog_url, null, null)
                })
            }
        });
    }

    if(githubID.length > 0){
        AFRAME.registerComponent('cursor-listener-github',{
            init: function () {
                github_url = `https://github.com/${githubID}`
                this.el.addEventListener('click', function (evt) {
                    window.open(github_url, null, null)
                })
            }
        });
    }

    if(instagramID.length > 0){
        AFRAME.registerComponent('cursor-listener-instagram',{
            init: function () {
                instagram_url = `https://www.instagram.com/${instagramID}`
                this.el.addEventListener('click', function (evt) {
                    window.open(instagram_url, null, null)
                })
            }
        });
    }
    
    if(profileURL.length > 0){
        AFRAME.registerComponent('cursor-listener-profile',{
            init: function () {
                this.el.addEventListener('click', function (evt) {
                    window.open(profileURL, null, null)
                })
            }
        });
    }
}


function display(twitterID, githubID, blog, instagramID, profileURL){
    var element_num = 5

    // name
    document.getElementById("name_entity").innerHTML = 
    '<a-entity \
    rotation = "-90 0 " \
    position="0 0.1 0.5"> \
      <a-text \
      value= ' + username + ' \
      color="white" \
      align="center" \
      width = "5"></a-text> \
    </a-entity>'

    class Elements{
        constructor(){
            this.radius = 0.8
            this.cnt = 0
            this.y, this.z = 0,0
            this.link_z_1, this.link_z_2 = 0,0
            this.link_y_1, this.link_y_2 = 0,0
        }
        display(param, param_name, color){
            if(param.length > 0){
                this.y = this.radius * Math.cos(2 * Math.PI / element_num * this.cnt)
                this.z = this.radius * Math.sin(2 * Math.PI / element_num * this.cnt)
                this.link_y_1 = 10 * this.radius * Math.cos(2 * Math.PI / element_num * this.cnt - 1 * Math.PI / element_num)
                this.link_y_2 = 10 * this.radius * Math.cos(2 * Math.PI / element_num * this.cnt + 1 * Math.PI / element_num)
                this.link_z_1 = 10 * this.radius * Math.sin(2 * Math.PI / element_num * this.cnt - 1 * Math.PI / element_num)
                this.link_z_2 = 10 * this.radius * Math.sin(2 * Math.PI / element_num * this.cnt + 1 * Math.PI / element_num)
                document.getElementById(param_name + "_entity").innerHTML =
                '<a-entity \
                rotation = "0 0 0" \
                position="'+ String(this.y) + ' 0.01 ' + String(this.z) + '" \
                cursor-listener-'+param_name+' \
                > \
                    <a-image \
                    src="object/image/' + param_name + '.png" \
                    rotation = "-90 0 0" \
                    position = "0 0 0" \
                    width="0.3" \
                    height="0.3" \
                    opacity = 1 \
                    animation="property: rotation; to: -60 -360 0; loop: true; dur: 30000; easing: linear" \
                    > \
                    </a-image> \
                    <a-sphere \
                    color = '+ color +' \
                    radius = "0.3" \
                    opacity = "0.3" \
                    > \
                    <a-triangle \
                    color = "green" \
                    vertex-a="' + String(this.link_y_1) + ' 0.1 ' + String(this.link_z_1) + '" \
                    vertex-b="'+String(-this.y)+' 0.1 '+String(-this.z)+'" \
                    vertex-c="' + String(this.link_y_2) + ' 0.1 ' + String(this.link_z_2) + '" \
                    opacity = "0.5" \
                    ></a-triangle> \
                </a-entity>'
            this.cnt += 1
            }
        }
    }
    elements = new Elements()
    elements.display(twitterID, "twitter", "#00aced");
    elements.display(blog, "blog", "blue");
    elements.display(githubID, "github", "#171515");
    elements.display(instagramID, "instagram","#3f729b");
    elements.display(profileURL, "profile", "#3CB371")
}

const twitterID = "yosyuaomenww"
const githubID = "seven320"
const blog = "https://denden-seven.hatenablog.com/"
const instagramID = "ken_4y4"
const profileURL = "https://denden.app/"

makelink(twitterID, githubID, blog, instagramID, profileURL)
display(twitterID, githubID, blog, instagramID, profileURL)