import mongoose from 'mongoose';

const urlValidator = function(v) {
  return v === '' || /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_.-]+\/?$/.test(v);
};

const schema = new mongoose.Schema({
  x: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de X o un string vacío.`,
      },
    },
  },
  facebook: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de Facebook o un string vacío.`,
      },
    },
  },
  instagram: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de Instagram o un string vacío.`,
      },
    },
  },
  whatsapp: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\/[0-9]+(\?text=.*)?$/.test(v);
        },
        message: props => `${props.value} no es un enlace válido de WhatsApp o un string vacío.`,
      },
    },
  },
  telegram: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(t\.me)\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de Telegram o un string vacío.`,
      },
    },
  },
  linkedin: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de LinkedIn o un string vacío.`,
      },
    },
  },
  tiktok: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?tiktok\.com\/@?[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de TikTok o un string vacío.`,
      },
    },
  },
  youtube: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel|c|user)\/|youtu\.be\/)[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de canal de YouTube o un string vacío.`,
      },
    },
  },
  threads: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?threads\.net\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de Threads o un string vacío.`,
      },
    },
  },
  pinterest: {
    name: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return v === '' || /^(https?:\/\/)?(www\.)?pinterest\.com\/[A-Za-z0-9_.-]+\/?$/.test(v);
        },
        message: props => `${props.value} no es una URL válida de perfil de Pinterest o un string vacío.`,
      },
    },
  },
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.models.SocialMedia || mongoose.model('SocialMedia', schema);
