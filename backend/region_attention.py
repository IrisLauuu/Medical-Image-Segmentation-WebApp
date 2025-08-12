# region_attention.py
import torch
import torch.nn as nn
import torch.nn.functional as F

class ChannelAttention(nn.Module):
    """Channel Attention Module
    
    This module learns inter-channel relationships through adaptive pooling and fully connected layers,
    applying importance weights to features across different channels.
    
    Args:
        in_channels (int): Number of input feature map channels
        reduction_ratio (int): Reduction ratio for computational efficiency, default is 16
    """
    def __init__(self, in_channels, reduction_ratio=16):
        super(ChannelAttention, self).__init__()
        # Global average pooling and max pooling to compress feature maps to 1x1
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
        
        # Shared MLP for dimensionality reduction and expansion
        self.fc = nn.Sequential(
            # 1x1 convolution for dimensionality reduction
            nn.Conv2d(in_channels, in_channels // reduction_ratio, 1, bias=False),
            nn.ReLU(),
            # Restore original channel dimensions
            nn.Conv2d(in_channels // reduction_ratio, in_channels, 1, bias=False)
        )
        
        # Sigmoid activation to normalize attention weights between 0 and 1
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # Calculate attention weights using average and max pooling
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        # Combine both attention mechanisms
        out = avg_out + max_out
        # Return feature map weighted by attention
        return self.sigmoid(out) * x


class SpatialAttention(nn.Module):
    """Spatial Attention Module
    
    This module focuses on spatial information in feature maps,
    learning importance weights for different spatial locations
    by utilizing channel-wise statistics.
    
    Args:
        kernel_size (int): Size of convolution kernel for spatial information aggregation, default is 7
    """
    def __init__(self, kernel_size=7):
        super(SpatialAttention, self).__init__()
        # 7x7 convolution for spatial information aggregation
        self.conv = nn.Conv2d(2, 1, kernel_size=kernel_size, 
                            padding=kernel_size // 2, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # Compute channel-wise statistics
        avg_out = torch.mean(x, dim=1, keepdim=True)  # Average pooling along channel dimension
        max_out, _ = torch.max(x, dim=1, keepdim=True)  # Max pooling along channel dimension
        # Concatenate average and max pooling results
        out = torch.cat([avg_out, max_out], dim=1)
        # Generate spatial attention map through convolution
        out = self.conv(out)
        # Return feature map weighted by spatial attention
        return self.sigmoid(out) * x