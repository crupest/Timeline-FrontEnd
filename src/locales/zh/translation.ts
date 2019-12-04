import TranslationResource from '../scheme';

const translation: TranslationResource = {
  welcome: '欢迎来到时间线！',
  home: {
    description:
      '<0>这是我，<1>crupest</1>，创建的第一个Web App。这个网站就是它的前端。你可以在Github上找到它的源代码（<3>前端</3>，<5>后端</5>）。现在我正在努力开发它，欢迎在Github上留下任何想法！</0><1>这个页面将来会被替换掉。</1>'
  },
  timeline: {
    messageCantSee: '不好意思，你没有权限查看这个时间线。😅',
    visibility: {
      public: '对所有人公开',
      register: '仅注册可见',
      private: '仅成员可见'
    },
    dialogChangeProperty: {
      title: '修改时间线属性',
      visibility: '可见性',
      description: '描述'
    }
  },
  user: {
    username: '用户名',
    password: '密码',
    login: '登录',
    noLoginPrompt: '你还没有登录!',
    welcome: '欢迎，{{name}} ！',
    logout: '注销',
    rememberMe: '记住我'
  },
  userPage: {
    dialogEditSelect: {
      title: '修改什么？',
      avatar: '头像',
      nickname: '昵称',
      timelineProperty: '时间线属性'
    },
    dialogChangeNickname: {
      title: '更改昵称',
      inputLabel: '新昵称'
    },
    dialogChangeAvatar: {
      title: '修改头像',
      prompt:
        '目前你必须手动把图片裁剪成方形才能将其上传为头像。将来会添加一个剪切组件，所以请期待吧！😅',
      previewImgAlt: '预览',
      imgPrompt: {
        select: '请选择一个图片',
        loadingFile: '加载文件...',
        decoding: '解码图片...',
        errorNotSquare: '图片不是正方形。'
      },
      upload: '上传'
    }
  },
  settings: {
    subheaders: {
      account: '账户',
      customization: '个性化'
    },
    languagePrimary: '选择显示的语言。',
    languageSecondary:
      '您的语言偏好将会存储在本地，下次浏览时将自动使用上次保存的语言选项。',
    changePassword: '更改账号的密码。',
    dialogChangePassword: {
      title: '修改密码',
      prompt:
        '您正在修改密码，您需要输入正确的旧密码。成功修改后您需要重新登陆，而且以前所有的登录都会失效。',
      inputOldPassword: '旧密码',
      inputNewPassword: '新密码',
      inputRetypeNewPassword: '再次输入新密码',
      errorEmptyOldPassword: '旧密码不能为空。',
      errorEmptyNewPassword: '新密码不能为空',
      errorRetypeNotMatch: '两次输入的密码不一致'
    }
  },
  admin: {
    title: '管理'
  }
};

export default translation;
