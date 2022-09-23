const html = document.documentElement;
const canvas = document.getElementById('ipad-canvas');
const container = document.querySelector('.ipad-container')
const context = canvas.getContext('2d');
const frameCount = 113;

const currentFrame = index => (
    `https://www.apple.com/105/media/us/ipad-air/2022/5abf2ff6-ee5b-4a99-849c-a127722124cc/anim/m1/image-sequence/large/large_${index.toString().padStart(5, '0')}.jpg`
)

const img = new Image();
img.src = currentFrame(0);
img.onload = function () {
    context.drawImage(img, 0, 0);
};

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop; // 현재 스크롤의 위치
    const maxScrollTop = container.scrollHeight - window.innerHeight; // 전체 스크롤 길이 - 내부 스크린 높이 = 최대 스크롤 값
    const scrollFraction = scrollTop / maxScrollTop; // 현재 스크롤 위치 / 최대 스크롤 값 = 현재 스크롤 위치의 백분율 ex) 50 / 100 = 0.5 즉 50%
    const frameIndex = Math.min(
        frameCount - 1, // 전체 프레임 컷보다 커지면 안되기 때문에
        Math.ceil(scrollFraction * frameCount)
    );
    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
    }

    requestAnimationFrame(() => updateImage(frameIndex))

    if(scrollTop/(html.scrollHeight - window.innerHeight) > 0.4) {
        document.querySelector('#flip').style.opacity = '1';
    } else {
        document.querySelector('#flip').style.opacity = '0';
    }

    if(scrollTop/(html.scrollHeight - window.innerHeight) > 0.65) {
        document.querySelector('#flip2').style.opacity = '1';
        document.querySelector('.strong2').style.opacity = '1';
    } else {
        document.querySelector('#flip2').style.opacity = '0';
        document.querySelector('.strong2').style.opacity = '0';
    }

    if (window.innerWidth <= 1200) {
        if(scrollTop/(html.scrollHeight - window.innerHeight) > 0.4) {
            document.querySelector('#flip').style.opacity = '1';
            document.querySelector('#flip2').style.opacity = '1';
            document.querySelector('.strong2').style.opacity = '1';
        } else {
            document.querySelector('#flip').style.opacity = '0';
            document.querySelector('#flip2').style.opacity = '0';
            document.querySelector('.strong2').style.opacity = '0';
        }

    }
})