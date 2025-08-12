# unet.py
import torch
import torch.nn as nn
import torch.nn.functional as F
from region_attention import ChannelAttention, SpatialAttention  # Introducing attention modules
class UNet(nn.Module):
    def __init__(self, use_attention):  # Add the use_attention parameter
        super(UNet, self).__init__()
        
        self.use_attention = use_attention  # Whether or not to use the attention setting
        def conv_block(in_channels, out_channels):
            layers = [
                nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
                nn.ReLU(inplace=True)
            ]
            if self.use_attention:
                layers.append(ChannelAttention(out_channels))  # Add channel attention
                layers.append(SpatialAttention())               # Add spatial attention
            return nn.Sequential(*layers)


        # Defining the encoder
        self.encoder1 = conv_block(3, 64)
        self.encoder2 = conv_block(64, 128)
        self.encoder3 = conv_block(128, 256)
        self.encoder4 = conv_block(256, 512)
        
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        
        # bottleneck
        self.bottleneck = conv_block(512, 1024)
        
        # Defining a decoder
        self.upconv4 = nn.ConvTranspose2d(1024, 512, kernel_size=2, stride=2)
        self.decoder4 = conv_block(1024, 512)
        self.upconv3 = nn.ConvTranspose2d(512, 256, kernel_size=2, stride=2)
        self.decoder3 = conv_block(512, 256)
        self.upconv2 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.decoder2 = conv_block(256, 128)
        self.upconv1 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.decoder1 = conv_block(128, 64)
        
        # The last layer
        self.final_layer = nn.Conv2d(64, 1, kernel_size=1)
    
    def forward(self, x):
        enc1 = self.encoder1(x)
        enc2 = self.encoder2(self.pool(enc1))
        enc3 = self.encoder3(self.pool(enc2))
        enc4 = self.encoder4(self.pool(enc3))
        
        middle = self.bottleneck(self.pool(enc4))
        
        dec4 = self.upconv4(middle)
        dec4 = self.decoder4(torch.cat([dec4, enc4], dim=1))
        
        dec3 = self.upconv3(dec4)
        dec3 = self.decoder3(torch.cat([dec3, enc3], dim=1))
        
        dec2 = self.upconv2(dec3)
        dec2 = self.decoder2(torch.cat([dec2, enc2], dim=1))
        
        dec1 = self.upconv1(dec2)
        dec1 = self.decoder1(torch.cat([dec1, enc1], dim=1))
        
        final_output = self.final_layer(dec1)
        return torch.sigmoid(final_output)

    def get_encoder(self, use_attention):
        return nn.Sequential(
            self.encoder1,
            self.pool,
            self.encoder2,
            self.pool,
            self.encoder3,
            self.pool,
            self.encoder4,
            self.pool,
            self.bottleneck
        )