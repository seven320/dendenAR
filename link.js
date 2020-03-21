/* product */

function makelink(twitter_url, githubID, blog, instagramID, profileURL){
    AFRAME.registerComponent('cursor-listener-icon', {
        init: function (){
            this.el.addEventListener('click', function (evt){
                console.log("icon change")
                window.open("https://www.google.com", null, null)
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

// ditton
document.getElementById("ditto").insertAdjacentHTML("afterbegin", 
    '<a-entity gltf-model="#ditton" \
    scale="0.1 0.1 0.1" \
    rotation="0 0 0" \
    animation-mixer> \
    </a-entity>'
)


function denden_display(twitter_url, github_url, blog_url, instagram_url, profile_url){
    // name
    // document.getElementById("name_entity").innerHTML = 
    // '<a-entity \
    // rotation = "-90 0 " \
    // position="0 0.1 0.5"> \
    //   <a-text \
    //   value= ' + escapeHtml(username) + ' \
    //   color="white" \
    //   align="center" \
    //   width = "5"></a-text> \
    // </a-entity>'

    class Elements{
        constructor(){
            this.radius = 1.6
            this.cnt = 0
            this.y, this.z = 0,0
            this.link_z_1, this.link_z_2 = 0,0
            this.link_y_1, this.link_y_2 = 0,0
        }
        display(param_url, param_name, color){
            this.y = this.radius * Math.cos(2 * Math.PI / element_num * this.cnt)
            this.z = this.radius * Math.sin(2 * Math.PI / element_num * this.cnt)
            this.link_y_1 = 10 * this.radius * Math.cos(2 * Math.PI / element_num * this.cnt - 1 * Math.PI / element_num)
            this.link_y_2 = 10 * this.radius * Math.cos(2 * Math.PI / element_num * this.cnt + 1 * Math.PI / element_num)
            this.link_z_1 = 10 * this.radius * Math.sin(2 * Math.PI / element_num * this.cnt - 1 * Math.PI / element_num)
            this.link_z_2 = 10 * this.radius * Math.sin(2 * Math.PI / element_num * this.cnt + 1 * Math.PI / element_num)
            document.getElementById(param_name + "_entity").insertAdjacentHTML("afterbegin",
            '<a-entity \
            position="'+ String(this.y) + ' 0.01 ' + String(this.z) + '" \
            cursor-listener-'+param_name+' \
            > \
                <a-image \
                src="#' + '" \
                rotation = "-90 0 0" \
                position = "0 0 0" \
                width="0.4" \
                height="0.4" \
                opacity = 0.9 \
                animation="property: rotation; to: -60 -360 0; loop: true; dur: 30000; easing: linear" \
                > \
                </a-image> \
                <a-sphere \
                color = '+ color +' \
                radius = "0.4" \
                opacity = "0.4" \
                > \
                <a-triangle \
                color = "green" \
                vertex-a="' + escapeHtml(String(this.link_y_1)) + ' 0.1 ' + escapeHtml(String(this.link_z_1)) + '" \
                vertex-b="'+ escapeHtml(String(-this.y))+' 0.1 '+escapeHtml(String(-this.z))+'" \
                vertex-c="' + escapeHtml(String(this.link_y_2)) + ' 0.1 ' + escapeHtml(String(this.link_z_2)) + '" \
                opacity = "0.1" \
                ></a-triangle> \
            </a-entity>')
        this.cnt += 1
        }
    }


    element = new Element()
    element.display(twitter_url, "twitter", color = "#00aced")
    element.display(github_url, "github", color = "#171515")
    element.display(blog_url, "blog", "blue")
    element.display(instagram_url, "instagram", "#3f729b")
    element.display(profile_url, "profile", "white")
}

const twitter_url = "https://twitter.com/yosyuaomenww"
const github_url = "https://github.com/seven320"
const blog_url = "https://denden-seven.hatenablog.com/"
const instagram_url = "https://www.instagram.com/ken_4y4"
const profile_url = "https://denden.app/"

var element_num = 5


denden_display(twitter_url, github_url, blog_url, instagram_url, profile_url)
makelink(twitter_url, github_url, blog_url, instagram_url, profile_url)