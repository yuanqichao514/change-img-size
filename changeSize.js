// 创建文件选择器
const input = document.createElement('input');
input.type = 'file';
input.multiple = true;

// 监听文件选择事件
input.addEventListener('change', handleFileSelect);

// 文件选择事件的回调函数
function handleFileSelect(event) {
  const files = event.target.files; // 获取选择的文件列表

  // 遍历文件列表
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // 创建图片对象
    const img = new Image();

    // 加载图片
    const reader = new FileReader();
    reader.onload = function (e) {
      img.onload = function () {
        // 创建Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置Canvas尺寸
        // const targetWidth = 800; // 设置目标宽度
        const targetHeight = 120; // 设置目标高度
        canvas.width = targetHeight * img.width / img.height;
        canvas.height = targetHeight;

        // 在Canvas上绘制图片并调整尺寸
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 导出调整后的图片
        canvas.toBlob(function (blob) {
          // 创建一个下载链接
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 's' + (i+1) + '.png'; // 设置下载文件的名称
          link.click();

          // 释放下载链接
          URL.revokeObjectURL(link.href);
        }, 'image/png', 1.0);
      };

      // 设置图片的源
      img.src = e.target.result;
    };

    // 读取文件数据
    reader.readAsDataURL(file);
  }
}

// 添加文件选择器到页面中
document.body.appendChild(input);
