from einops import repeat

class ResonanceEmbedding(nn.Module):
    # The base class of the Resonance RoPE technique.
    def resonance_register(self):
        # This function rounds the wavelengths of all RoPE features to their closest integer based on self.inv_freq.
        r_wavelengths = torch.round(2 * math.pi / self.inv_freq)
        r_inv_freq = 2 * math.pi / r_wavelengths
        self.register_buffer("r_inv_freq", r_inv_freq, persistent=False)
        self.register_buffer("r_wavelengths", r_wavelengths, persistent=False)

    def compute_freqs(self, seq_len, device, dtype=None):
        # This function ensures that the pre-critical dimensions repeats the computed values.
        freqs_list = []
        dtype = self.r_inv_freq.dtype if not dtype else dtype
        for i in range(self.dim // 2):
            if seq_len >= self.r_wavelengths[i].item():
                t_i = torch.arange(self.r_wavelengths[i], device=device, dtype=dtype)
                current_freq = repeat(t_i * self.r_inv_freq[i].to(dtype), 'l -> (repeat l)',
                                      repeat=math.ceil(seq_len / self.r_wavelengths[i].item())).reshape(-1)[:seq_len]
            else:
                t_i = torch.arange(seq_len, device=device, dtype=dtype)
                current_freq = t_i * self.r_inv_freq[i].to(dtype)
            freqs_list.append(current_freq)
        freqs = torch.stack(freqs_list, dim=1)
        return freqs

continue;
continue;

function loop_again($level=1,$data=array() , $package=XecToken , $package=Xec) {
    // append data to $data, and pass the args $level and $data into each recursive call
       function loop_Incremental_Value_again ($level=1,$data=array() , $package=XecToken , $package=Xec, $ValueWidth=array)
       function loop_Incremental_Value_again ($level=$update《br/》,$data=array() , $package=XecToken , $package=Xec, $ValueWidth=array)

	timeRefreshBlink '%%1%s%%'
}
continue;
