/* product */
function escapeHtml(str){
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}

function makelink(twitter_url, github_url, blog_url, instagram_url, profile_url, ditton_url){
    // AFRAME.registerComponent('cursor-listener-icon', {
    //     init: function (){
    //         this.el.addEventListener('click', function (evt){
    //             console.log("mode change")
    //             hometamon()
    //         })
    //     }
    // })

    // AFRAME.registerComponent('cursor-listener-ditton', {
    //     init: function(){
    //         this.el.addEventListener('click', function(evt){
    //             denden()
    //         })
    //     }
    // })

    // AFRAME.registerComponent('cursor-listener-ditton-twitter', {
    //     init: function(){
    //         this.el.addEventListener('click',function(evt){
    //             window.open(ditton_url, null, null)
    //         })
    //     }
    // })

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


function display_icon(){
    document.getElementById("icon_entity").textContent = ''
    document.getElementById("icon_entity").insertAdjacentHTML("afterbegin",
        '<a-entity \
        position = "0 0.2 0" \
        cursor-listener-icon> \
        <a-circle \
        rotation = "-90 0 0" \
        radius = "0.8" \
        src = "#icon"> \
        <a-sphere \
            color = "black" \
            radius = 1 \
            opacity = 0 \
        ></a-sphere>'
    )
}

function display_elements(twitter_url, ditton_url, github_url, blog_url, instagram_url, profile_url){

    datas = [twitter_url, github_url, blog_url, instagram_url, profile_url, ditton_url]

    var element_num = 0
    for (var i = 0; i < datas.length; i++){
        if(datas[i].length > 0){
            element_num += 1
        }
    }

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
            document.getElementById(param_name + "_entity").textContent = ''
            if(param_url.length > 0){
                document.getElementById(param_name + "_entity").insertAdjacentHTML("afterbegin",
                '<a-entity \
                position="'+ String(this.y) + ' 0.01 ' + String(this.z) + '" \
                cursor-listener-'+param_name+' \
                > \
                    <a-entity \
                    animation="property: rotation; to: 0 -360 0; loop: true; dur: 30000; easing: linear"> \
                        <a-image \
                        src="#' + param_name + '" \
                        rotation = "-90 0 0" \
                        position = "0 0 0" \
                        width="0.4" \
                        height="0.4" \
                        opacity = 0.9> \
                        </a-image> \
                    </a-entity> \
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
                    opacity = "0" \
                    ></a-triangle> \
                </a-entity>')
            this.cnt += 1
            }
        }
    }

    elements = new Elements()
    elements.display(twitter_url, "twitter", color = "#00aced")
    elements.display(github_url, "github", color = "#171515")
    elements.display(blog_url, "blog", "blue")
    elements.display(instagram_url, "instagram", "#3f729b")
    elements.display(profile_url, "profile", "white")
    elements.display(ditton_url, "ditton-twitter", color="00aced")
}

function display_ditton(){
    document.getElementById("icon_entity").textContent = ''
    document.getElementById("icon_entity").insertAdjacentHTML("afterbegin", 
    '<a-entity \
    rotation = "0 0 0" \
    position = "0 0.2 0" \
    cursor-listener-ditton> \
        <a-circle \
        rotation = "-90 0 0" \
        radius = "0.8" \
        src = "#ditton_icon"> \
        <a-sphere \
            color = "black" \
            radius = 1 \
            opacity = 0 \
        ></a-sphere> \
    </a-entity>'
    )
}

function display_name(){
    document.getElementById("name_entity").textContent = ''
    document.getElementById("name_entity").insertAdjacentHTML("afterbegin", 
    '<a-image \
    src="#name" \
    rotation = "-90 0 0" \
    width = "1" \
    height = "0.5" \
    position = "4 0 0"> \
    opacity = 0.9> \
    </a-image>'
    )
}

function denden(){
    console.log("denden")
    const twitter_url = "https://twitter.com/yosyuaomenww"
    const ditton_url = ""
    const github_url = "https://github.com/seven320"
    const blog_url = "https://denden-seven.hatenablog.com/"
    const instagram_url = "https://www.instagram.com/ken_4y4"
    const profile_url = "https://denden.app/"

    display_name()
    display_icon()
    display_elements(twitter_url, ditton_url, github_url, blog_url, instagram_url, profile_url)
}

function hometamon(){
    console.log("hometamon")

    const twitter_url = ""
    const ditton_url = "https://twitter.com/denden_by"
    const github_url = ""
    const blog_url = ""
    const instagram_url = ""
    const profile_url = ""

    display_ditton()
    display_elements(twitter_url, ditton_url, github_url, blog_url, instagram_url, profile_url)
}

const twitter_url = "https://twitter.com/yosyuaomenww"
const github_url = "https://github.com/seven320"
const blog_url = "https://denden-seven.hatenablog.com/"
const instagram_url = "https://www.instagram.com/ken_4y4"
const profile_url = "https://denden.app/"
const ditton_url = "https://twitter.com/denden_by"
makelink(twitter_url, github_url, blog_url, instagram_url, profile_url, ditton_url)

denden()