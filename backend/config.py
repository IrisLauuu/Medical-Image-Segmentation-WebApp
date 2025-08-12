import torch

class Config:
    # General Configuration
    SEED = 42  # Random seeds to ensure reproducible results
    DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'  # Automatically select GPU or CPU
    USE_AUTOENCODER = True  # Whether to use autoencoder mode
    
    # Dataset path configuration Multicell
    # TRAIN_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/train/images'
    # TRAIN_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/train/masks'
    # VAL_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/val/images'
    # VAL_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/val/masks'
    # TEST_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/test/images'
    # TEST_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/nuclei/output/test/masks'
    # CHECKPOINT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/SSL_Autoencoder_Unet_Attention/checkpoints'  # Model weight saving path
    # LOG_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/SSL_Autoencoder_Unet_Attention/logs'  # Training log save path

    # skin disease
    # TRAIN_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1-2_Training_Input'
    # TRAIN_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1_Training_GroundTruth'
    # VAL_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1-2_Validation_Input'
    # VAL_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1_Validation_GroundTruth'
    # TEST_INPUT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1-2_Test_Input'
    # TEST_GT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/dataset/isic 2018/skin lesion/ISIC2018_Task1_Test_GroundTruth'
    # CHECKPOINT_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/SSL_Autoencoder_Unet_Attention/checkpoints'  # Model weight saving path
    # LOG_DIR = '/content/drive/MyDrive/Colab Notebooks/COMP9900/SSL_Autoencoder_Unet_Attention/logs'  # Training log save path

    # SSL pre-training configuration
    SSL_BATCH_SIZE = 16
    SSL_LR = 1e-5  # Learning Rate
    SSL_EPOCHS =40
    SSL_TEMPERATURE = 0.5  # Temperature parameters in SimCLR

    # U-Net training configuration
    UNET_BATCH_SIZE = 8
    UNET_LR = 5e-5  # Learning Rate
    UNET_EPOCHS = 100
    UNET_WEIGHT_DECAY = 1e-5  # Weight decay (regularization)
    USE_PRETRAINED_ENCODER = True  # Whether to use pre-trained encoder
    USE_ATTENTION = True  # Controls whether to use the regional attention mechanism

    # Image processing configuration
    IMAGE_SIZE = (256, 256)  # The size of the input image (width, height)
    NUM_WORKERS = 1  # Number of parallel DataLoaders

    # Checkpoint and log saving configuration
    SAVE_MODEL_FREQUENCY = 1  # the number of epochs should the model be saved at?
    LOG_FREQUENCY = 100  # The number of training logs to print every few steps

    # Evaluation indicators
    METRICS = ['dice', 'iou']  # Evaluation metrics used during model training and validation

# Get Configuration
def get_config():
    return Config
