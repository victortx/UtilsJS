# Ejemplo de como una calse recibe el request para el formm vaild
class HospitalizacionDatosAdmisionAdministracionView(UpdateView):
    template_name = 'hospitalizacion/admision/datos-admision-administracion.html'
    model = Hospitalizacion
    form_class = DatosAdmisionAdministracionForm
    success_url = '#'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        encargado_formset = formset_factory(EncargadoPacienteForm, extra=1)
        context['formset_encargado'] = encargado_formset(prefix='Encargado')
        # Copy helper for styles in form
        context['helper'] = context.get('form').helper
        return context

    def form_valid(self, form): # entra al form_valid desde el ajax
        self.request.POST._mutable = True
        encargado_formset = formset_factory(EncargadoPacienteForm) # se serializa el form que se envio
        formset_encargado = encargado_formset(self.request.POST, self.request.FILES, prefix='Encargado')
        with transaction.atomic():
            # Guardar el registro de la persona si no existe
            registro = form.save(commit=False)

            if formset_encargado[0].is_valid():
                pass
                #encargado = formset_encargado[0].save(commit=False)
                #encargado.hospitalizacion_id = registro.pk
                #encargado.save()
                #registro.estado = Hospitalizacion.ADMITIDO
                #registro.save()
            messages.success(self.request, 'Admisión Completada.')
            return JsonResponse({'data':'hola'}) # -----------------------------------> a qui es donde se devuelve para el ajax que se envia desde javascript